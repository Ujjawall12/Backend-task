import { Router } from 'express';
import { body } from 'express-validator';
import { createNudge, getNudges, getNudgeById } from '../controllers/nudgeController';
import { upload } from '../middleware/upload';

const router = Router();

const validateNudge = [
  body('title').isString().trim().isLength({ min: 1, max: 50 }),
  body('description').isString().trim(),
  body('eventId').isString().trim(),
  body('scheduledDate').isISO8601(),
  body('startTime').matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/),
  body('endTime').matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)
];

router.post('/', upload.single('image'), validateNudge, createNudge);
router.get('/', getNudges);
router.get('/:id', getNudgeById);

export default router;