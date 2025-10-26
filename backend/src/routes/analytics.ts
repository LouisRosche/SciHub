import express, { Response } from 'express';
import { authenticate, AuthRequest } from '../middleware/auth';
import { query } from '../config/database';

const router = express.Router();
router.use(authenticate);

// Get student progress over time
router.get('/progress', async (req: AuthRequest, res: Response) => {
  try {
    const result = await query(
      `SELECT
        DATE_TRUNC('day', created_at) as date,
        COUNT(*) as count
       FROM notecards
       WHERE student_id = $1
       AND created_at >= CURRENT_DATE - INTERVAL '30 days'
       GROUP BY DATE_TRUNC('day', created_at)
       ORDER BY date`,
      [req.user!.userId]
    );
    res.json({ progress: result.rows });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch progress' });
  }
});

export default router;
