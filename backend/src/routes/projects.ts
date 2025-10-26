import express, { Response } from 'express';
import { authenticate, AuthRequest } from '../middleware/auth';
import { query } from '../config/database';

const router = express.Router();
router.use(authenticate);

// Get all projects
router.get('/', async (req: AuthRequest, res: Response) => {
  try {
    const result = await query('SELECT * FROM projects ORDER BY created_at DESC');
    res.json({ projects: result.rows });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
});

// Get student's projects
router.get('/my-projects', async (req: AuthRequest, res: Response) => {
  try {
    const result = await query(
      `SELECT sp.*, p.* FROM student_projects sp
       JOIN projects p ON sp.project_id = p.id
       WHERE sp.student_id = $1`,
      [req.user!.userId]
    );
    res.json({ projects: result.rows });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
});

// Enroll in project
router.post('/enroll/:projectId', async (req: AuthRequest, res: Response) => {
  try {
    const result = await query(
      `INSERT INTO student_projects (student_id, project_id)
       VALUES ($1, $2)
       ON CONFLICT (student_id, project_id) DO NOTHING
       RETURNING *`,
      [req.user!.userId, req.params.projectId]
    );
    res.json({ enrollment: result.rows[0] });
  } catch (error) {
    res.status(500).json({ error: 'Failed to enroll in project' });
  }
});

export default router;
