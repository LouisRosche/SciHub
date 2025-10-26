import express, { Response } from 'express';
import { param, body, validationResult } from 'express-validator';
import { authenticate, AuthRequest } from '../middleware/auth';
import { query } from '../config/database';

const router = express.Router();

router.use(authenticate);

// Get current student profile
router.get('/me', async (req: AuthRequest, res: Response) => {
  try {
    const result = await query(
      'SELECT * FROM v_student_dashboard WHERE student_id = $1',
      [req.user!.userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Student not found' });
    }

    res.json({ student: result.rows[0] });
  } catch (error) {
    console.error('Error fetching student profile:', error);
    res.status(500).json({ error: 'Failed to fetch profile' });
  }
});

// Update student profile
router.put('/me',
  [
    body('interests').optional().isArray(),
    body('gradeLevel').optional().isString()
  ],
  async (req: AuthRequest, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { interests, gradeLevel } = req.body;
      const updates: string[] = [];
      const values: any[] = [];
      let paramCount = 1;

      if (interests !== undefined) {
        updates.push(`interests = $${paramCount++}`);
        values.push(interests);
      }

      if (gradeLevel !== undefined) {
        updates.push(`grade_level = $${paramCount++}`);
        values.push(gradeLevel);
      }

      if (updates.length === 0) {
        return res.status(400).json({ error: 'No fields to update' });
      }

      values.push(req.user!.userId);

      const result = await query(
        `UPDATE users
         SET ${updates.join(', ')}, updated_at = CURRENT_TIMESTAMP
         WHERE id = $${paramCount}
         RETURNING *`,
        values
      );

      res.json({ student: result.rows[0] });
    } catch (error) {
      console.error('Error updating student profile:', error);
      res.status(500).json({ error: 'Failed to update profile' });
    }
  }
);

// Get student statistics
router.get('/me/stats', async (req: AuthRequest, res: Response) => {
  try {
    const stats = await query(
      `SELECT
        COUNT(*) FILTER (WHERE status = 'submitted') as total_submitted,
        COUNT(*) FILTER (WHERE created_at >= CURRENT_DATE - INTERVAL '7 days') as this_week,
        COUNT(*) FILTER (WHERE created_at >= CURRENT_DATE - INTERVAL '30 days') as this_month,
        AVG(mastery_level) as avg_mastery
      FROM notecards
      WHERE student_id = $1`,
      [req.user!.userId]
    );

    const streak = await calculateStreak(req.user!.userId);

    res.json({
      ...stats.rows[0],
      streak
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
});

// Get learning path
router.get('/me/learning-path', async (req: AuthRequest, res: Response) => {
  try {
    const result = await query(
      'SELECT * FROM learning_paths WHERE student_id = $1',
      [req.user!.userId]
    );

    if (result.rows.length === 0) {
      // Create default learning path
      const newPath = await query(
        `INSERT INTO learning_paths (student_id)
         VALUES ($1)
         RETURNING *`,
        [req.user!.userId]
      );
      return res.json({ learningPath: newPath.rows[0] });
    }

    res.json({ learningPath: result.rows[0] });
  } catch (error) {
    console.error('Error fetching learning path:', error);
    res.status(500).json({ error: 'Failed to fetch learning path' });
  }
});

// Calculate streak helper
async function calculateStreak(studentId: string): Promise<number> {
  const result = await query(
    `SELECT DATE(created_at) as date
     FROM notecards
     WHERE student_id = $1 AND status = 'submitted'
     GROUP BY DATE(created_at)
     ORDER BY DATE(created_at) DESC
     LIMIT 365`,
    [studentId]
  );

  let streak = 0;
  let currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);

  for (const row of result.rows) {
    const cardDate = new Date(row.date);
    cardDate.setHours(0, 0, 0, 0);

    const diffDays = Math.floor(
      (currentDate.getTime() - cardDate.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (diffDays === streak) {
      streak++;
    } else if (diffDays > streak) {
      break;
    }
  }

  return streak;
}

export default router;
