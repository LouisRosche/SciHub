import express, { Request, Response } from 'express';
import { oauth2Client, verifyIdToken, getUserInfo, getAuthUrl } from '../config/google-auth';
import { query } from '../config/database';
import { generateToken } from '../middleware/auth';

const router = express.Router();

// Get Google OAuth URL
router.get('/google/url', (req: Request, res: Response) => {
  try {
    const url = getAuthUrl();
    res.json({ url });
  } catch (error) {
    console.error('Error generating auth URL:', error);
    res.status(500).json({ error: 'Failed to generate auth URL' });
  }
});

// Google OAuth callback
router.post('/google/callback', async (req: Request, res: Response) => {
  const { code } = req.body;

  if (!code) {
    return res.status(400).json({ error: 'Authorization code is required' });
  }

  try {
    // Exchange code for tokens
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    if (!tokens.id_token) {
      return res.status(400).json({ error: 'No ID token received' });
    }

    // Verify ID token
    const payload = await verifyIdToken(tokens.id_token);

    if (!payload || !payload.email) {
      return res.status(400).json({ error: 'Invalid token payload' });
    }

    // Check if user exists
    let user = await query(
      'SELECT * FROM users WHERE google_id = $1',
      [payload.sub]
    );

    // Create user if doesn't exist
    if (user.rows.length === 0) {
      const result = await query(
        `INSERT INTO users (google_id, email, name, profile_picture_url, role)
         VALUES ($1, $2, $3, $4, $5)
         RETURNING *`,
        [
          payload.sub,
          payload.email,
          payload.name || payload.email.split('@')[0],
          payload.picture || null,
          'student' // Default role
        ]
      );
      user = result;
    } else {
      // Update last login
      await query(
        'UPDATE users SET last_login_at = CURRENT_TIMESTAMP WHERE id = $1',
        [user.rows[0].id]
      );
    }

    const userData = user.rows[0];

    // Generate JWT
    const token = generateToken({
      userId: userData.id,
      email: userData.email,
      role: userData.role
    });

    // Return user data and token
    res.json({
      token,
      user: {
        id: userData.id,
        email: userData.email,
        name: userData.name,
        role: userData.role,
        gradeLevel: userData.grade_level,
        profilePicture: userData.profile_picture_url,
        interests: userData.interests
      }
    });
  } catch (error) {
    console.error('Auth callback error:', error);
    res.status(500).json({ error: 'Authentication failed' });
  }
});

// Verify token (for frontend to check if token is still valid)
router.post('/verify', async (req: Request, res: Response) => {
  const { idToken } = req.body;

  if (!idToken) {
    return res.status(400).json({ error: 'ID token is required' });
  }

  try {
    const payload = await verifyIdToken(idToken);

    if (!payload || !payload.email) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    // Get user from database
    const result = await query(
      'SELECT id, email, name, role, grade_level, profile_picture_url, interests FROM users WHERE google_id = $1',
      [payload.sub]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const user = result.rows[0];

    // Generate new JWT
    const token = generateToken({
      userId: user.id,
      email: user.email,
      role: user.role
    });

    res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        gradeLevel: user.grade_level,
        profilePicture: user.profile_picture_url,
        interests: user.interests
      }
    });
  } catch (error) {
    console.error('Token verification error:', error);
    res.status(401).json({ error: 'Invalid token' });
  }
});

// Logout (client-side should delete token)
router.post('/logout', (req: Request, res: Response) => {
  // In a stateless JWT system, logout is handled client-side
  // But we can log the activity
  res.json({ message: 'Logged out successfully' });
});

export default router;
