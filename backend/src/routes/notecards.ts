import express, { Response } from 'express';
import { body, param, query as validateQuery, validationResult } from 'express-validator';
import { authenticate, authorize, AuthRequest } from '../middleware/auth';
import { query, transaction } from '../config/database';

const router = express.Router();

// All notecard routes require authentication
router.use(authenticate);

// Get all notecards for current user (student view)
router.get('/', async (req: AuthRequest, res: Response) => {
  try {
    const { status, projectId, limit = '50', offset = '0' } = req.query;

    let queryText = `
      SELECT
        n.*,
        p.title as project_title,
        p.template_id as project_template_id
      FROM notecards n
      LEFT JOIN projects p ON n.project_id = p.id
      WHERE n.student_id = $1
    `;
    const params: any[] = [req.user!.userId];
    let paramCount = 1;

    if (status) {
      paramCount++;
      queryText += ` AND n.status = $${paramCount}`;
      params.push(status);
    }

    if (projectId) {
      paramCount++;
      queryText += ` AND n.project_id = $${paramCount}`;
      params.push(projectId);
    }

    queryText += ` ORDER BY n.created_at DESC LIMIT $${paramCount + 1} OFFSET $${paramCount + 2}`;
    params.push(parseInt(limit as string), parseInt(offset as string));

    const result = await query(queryText, params);

    res.json({
      notecards: result.rows,
      total: result.rowCount,
      limit: parseInt(limit as string),
      offset: parseInt(offset as string)
    });
  } catch (error) {
    console.error('Error fetching notecards:', error);
    res.status(500).json({ error: 'Failed to fetch notecards' });
  }
});

// Get notecards due for review
router.get('/review', async (req: AuthRequest, res: Response) => {
  try {
    const result = await query(
      `SELECT
        n.*,
        p.title as project_title
      FROM notecards n
      LEFT JOIN projects p ON n.project_id = p.id
      WHERE n.student_id = $1
      AND n.status = 'submitted'
      AND (n.next_review_date IS NULL OR n.next_review_date <= CURRENT_TIMESTAMP)
      ORDER BY n.next_review_date ASC NULLS FIRST, n.created_at ASC
      LIMIT 20`,
      [req.user!.userId]
    );

    res.json({ notecards: result.rows });
  } catch (error) {
    console.error('Error fetching review notecards:', error);
    res.status(500).json({ error: 'Failed to fetch review notecards' });
  }
});

// Get single notecard
router.get('/:id',
  param('id').isUUID(),
  async (req: AuthRequest, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const result = await query(
        `SELECT
          n.*,
          p.title as project_title,
          p.template_id as project_template_id
        FROM notecards n
        LEFT JOIN projects p ON n.project_id = p.id
        WHERE n.id = $1`,
        [req.params.id]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Notecard not found' });
      }

      const notecard = result.rows[0];

      // Check ownership or teacher role
      if (notecard.student_id !== req.user!.userId && req.user!.role !== 'teacher') {
        return res.status(403).json({ error: 'Access denied' });
      }

      res.json({ notecard: result.rows[0] });
    } catch (error) {
      console.error('Error fetching notecard:', error);
      res.status(500).json({ error: 'Failed to fetch notecard' });
    }
  }
);

// Create notecard
router.post('/',
  [
    body('frontSide').isObject(),
    body('frontSide.content').notEmpty(),
    body('backSide').isObject(),
    body('backSide.content').notEmpty(),
    body('projectId').optional().isUUID(),
    body('ccc').optional().isArray(),
    body('sep').optional().isArray(),
    body('tags').optional().isArray(),
    body('status').optional().isIn(['draft', 'submitted'])
  ],
  async (req: AuthRequest, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const {
        frontSide,
        backSide,
        projectId,
        dciCodes,
        ccc,
        sep,
        prompt,
        selfAssessment,
        tags,
        status = 'draft'
      } = req.body;

      const result = await query(
        `INSERT INTO notecards (
          student_id, project_id,
          front_side_type, front_side_content, front_side_image_url,
          back_side_type, back_side_content, back_side_image_url,
          dci_codes, ccc_codes, sep_codes,
          prompt, self_assessment, tags, status,
          submitted_at
        ) VALUES (
          $1, $2,
          $3, $4, $5,
          $6, $7, $8,
          $9, $10, $11,
          $12, $13, $14, $15,
          $16
        ) RETURNING *`,
        [
          req.user!.userId,
          projectId || null,
          frontSide.type || 'text',
          frontSide.content,
          frontSide.imageUrl || null,
          backSide.type || 'text',
          backSide.content,
          backSide.imageUrl || null,
          dciCodes || null,
          ccc || null,
          sep || null,
          prompt || null,
          selfAssessment || null,
          tags || [],
          status,
          status === 'submitted' ? new Date() : null
        ]
      );

      // If submitted, update standards progress
      if (status === 'submitted' && (ccc || sep || dciCodes)) {
        await updateStandardsProgress(req.user!.userId, { dciCodes, ccc, sep });
      }

      res.status(201).json({ notecard: result.rows[0] });
    } catch (error) {
      console.error('Error creating notecard:', error);
      res.status(500).json({ error: 'Failed to create notecard' });
    }
  }
);

// Update notecard
router.put('/:id',
  [
    param('id').isUUID(),
    body('frontSide').optional().isObject(),
    body('backSide').optional().isObject(),
    body('status').optional().isIn(['draft', 'submitted', 'reviewed'])
  ],
  async (req: AuthRequest, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // Check ownership
      const ownerCheck = await query(
        'SELECT student_id, status FROM notecards WHERE id = $1',
        [req.params.id]
      );

      if (ownerCheck.rows.length === 0) {
        return res.status(404).json({ error: 'Notecard not found' });
      }

      if (ownerCheck.rows[0].student_id !== req.user!.userId) {
        return res.status(403).json({ error: 'Access denied' });
      }

      const {
        frontSide,
        backSide,
        ccc,
        sep,
        dciCodes,
        selfAssessment,
        tags,
        status
      } = req.body;

      // Build dynamic update query
      const updates: string[] = [];
      const values: any[] = [];
      let paramCount = 1;

      if (frontSide) {
        if (frontSide.content !== undefined) {
          updates.push(`front_side_content = $${paramCount++}`);
          values.push(frontSide.content);
        }
        if (frontSide.imageUrl !== undefined) {
          updates.push(`front_side_image_url = $${paramCount++}`);
          values.push(frontSide.imageUrl);
        }
      }

      if (backSide) {
        if (backSide.content !== undefined) {
          updates.push(`back_side_content = $${paramCount++}`);
          values.push(backSide.content);
        }
        if (backSide.imageUrl !== undefined) {
          updates.push(`back_side_image_url = $${paramCount++}`);
          values.push(backSide.imageUrl);
        }
      }

      if (ccc !== undefined) {
        updates.push(`ccc_codes = $${paramCount++}`);
        values.push(ccc);
      }

      if (sep !== undefined) {
        updates.push(`sep_codes = $${paramCount++}`);
        values.push(sep);
      }

      if (dciCodes !== undefined) {
        updates.push(`dci_codes = $${paramCount++}`);
        values.push(dciCodes);
      }

      if (selfAssessment !== undefined) {
        updates.push(`self_assessment = $${paramCount++}`);
        values.push(selfAssessment);
      }

      if (tags !== undefined) {
        updates.push(`tags = $${paramCount++}`);
        values.push(tags);
      }

      if (status !== undefined) {
        updates.push(`status = $${paramCount++}`);
        values.push(status);

        if (status === 'submitted' && ownerCheck.rows[0].status !== 'submitted') {
          updates.push(`submitted_at = CURRENT_TIMESTAMP`);
        }
      }

      if (updates.length === 0) {
        return res.status(400).json({ error: 'No fields to update' });
      }

      values.push(req.params.id);

      const result = await query(
        `UPDATE notecards
         SET ${updates.join(', ')}, updated_at = CURRENT_TIMESTAMP
         WHERE id = $${paramCount}
         RETURNING *`,
        values
      );

      // Update standards if submitted
      if (status === 'submitted' && ownerCheck.rows[0].status !== 'submitted') {
        await updateStandardsProgress(req.user!.userId, { dciCodes, ccc, sep });
      }

      res.json({ notecard: result.rows[0] });
    } catch (error) {
      console.error('Error updating notecard:', error);
      res.status(500).json({ error: 'Failed to update notecard' });
    }
  }
);

// Update review status (after spaced repetition)
router.post('/:id/review',
  [
    param('id').isUUID(),
    body('difficulty').isIn(['easy', 'medium', 'hard']),
    body('masteryLevel').optional().isInt({ min: 0, max: 5 })
  ],
  async (req: AuthRequest, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { difficulty, masteryLevel } = req.body;

      // Calculate next review date based on difficulty
      const intervals = {
        easy: [1, 3, 7, 14, 30, 60],
        medium: [1, 2, 4, 8, 16, 32],
        hard: [1, 1, 2, 3, 5, 8]
      };

      const notecard = await query(
        'SELECT mastery_level, review_count FROM notecards WHERE id = $1 AND student_id = $2',
        [req.params.id, req.user!.userId]
      );

      if (notecard.rows.length === 0) {
        return res.status(404).json({ error: 'Notecard not found' });
      }

      const currentMastery = notecard.rows[0].mastery_level;
      const reviewCount = notecard.rows[0].review_count;

      let newMastery = masteryLevel !== undefined ? masteryLevel : currentMastery;
      if (difficulty === 'easy') newMastery = Math.min(5, newMastery + 1);
      else if (difficulty === 'hard') newMastery = Math.max(0, newMastery - 1);

      const daysUntilReview = intervals[difficulty][Math.min(currentMastery, 5)];
      const nextReviewDate = new Date();
      nextReviewDate.setDate(nextReviewDate.getDate() + daysUntilReview);

      const result = await query(
        `UPDATE notecards
         SET mastery_level = $1,
             next_review_date = $2,
             review_count = review_count + 1,
             updated_at = CURRENT_TIMESTAMP
         WHERE id = $3 AND student_id = $4
         RETURNING *`,
        [newMastery, nextReviewDate, req.params.id, req.user!.userId]
      );

      res.json({ notecard: result.rows[0] });
    } catch (error) {
      console.error('Error updating review status:', error);
      res.status(500).json({ error: 'Failed to update review status' });
    }
  }
);

// Delete notecard
router.delete('/:id',
  param('id').isUUID(),
  async (req: AuthRequest, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const result = await query(
        'DELETE FROM notecards WHERE id = $1 AND student_id = $2 RETURNING id',
        [req.params.id, req.user!.userId]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Notecard not found' });
      }

      res.json({ message: 'Notecard deleted successfully' });
    } catch (error) {
      console.error('Error deleting notecard:', error);
      res.status(500).json({ error: 'Failed to delete notecard' });
    }
  }
);

// Helper function to update standards progress
async function updateStandardsProgress(studentId: string, standards: {
  dciCodes?: string[],
  ccc?: string[],
  sep?: string[]
}) {
  const allStandards = [
    ...(standards.dciCodes?.map(code => ({ code, type: 'DCI' })) || []),
    ...(standards.ccc?.map(code => ({ code, type: 'CCC' })) || []),
    ...(standards.sep?.map(code => ({ code, type: 'SEP' })) || [])
  ];

  for (const standard of allStandards) {
    await query(
      `INSERT INTO student_standards (student_id, standard_code, standard_type, evidence_count, last_practiced_at)
       VALUES ($1, $2, $3, 1, CURRENT_TIMESTAMP)
       ON CONFLICT (student_id, standard_code, standard_type)
       DO UPDATE SET
         evidence_count = student_standards.evidence_count + 1,
         last_practiced_at = CURRENT_TIMESTAMP,
         updated_at = CURRENT_TIMESTAMP`,
      [studentId, standard.code, standard.type]
    );
  }
}

export default router;
