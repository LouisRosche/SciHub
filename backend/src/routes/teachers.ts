import express, { Response } from 'express';
import { authenticate, authorize, AuthRequest } from '../middleware/auth';
import { query } from '../config/database';

const router = express.Router();
router.use(authenticate);
router.use(authorize('teacher', 'admin'));

// Get teacher's classes
router.get('/classes', async (req: AuthRequest, res: Response) => {
  try {
    const result = await query(
      'SELECT * FROM v_teacher_class_overview WHERE teacher_id = $1',
      [req.user!.userId]
    );
    res.json({ classes: result.rows });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch classes' });
  }
});

// Get all notecards for review
router.get('/notecards/pending', async (req: AuthRequest, res: Response) => {
  try {
    const result = await query(
      `SELECT n.*, u.name as student_name
       FROM notecards n
       JOIN class_enrollments ce ON n.student_id = ce.student_id
       JOIN classes c ON ce.class_id = c.id
       JOIN users u ON n.student_id = u.id
       WHERE c.teacher_id = $1
       AND n.status = 'submitted'
       AND n.teacher_feedback IS NULL
       ORDER BY n.submitted_at DESC`,
      [req.user!.userId]
    );
    res.json({ notecards: result.rows });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch notecards' });
  }
});

// Provide feedback on notecard
router.post('/notecards/:id/feedback', async (req: AuthRequest, res: Response) => {
  try {
    const { feedback } = req.body;
    const result = await query(
      `UPDATE notecards
       SET teacher_feedback = $1,
           status = 'reviewed',
           reviewed_at = CURRENT_TIMESTAMP
       WHERE id = $2
       RETURNING *`,
      [feedback, req.params.id]
    );
    res.json({ notecard: result.rows[0] });
  } catch (error) {
    res.status(500).json({ error: 'Failed to provide feedback' });
  }
});

export default router;
