import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { Nudge } from '../types/nudge';

// In-memory storage for demonstration
let nudges: Nudge[] = [];

export const createNudge = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const {
      title,
      description,
      eventId,
      scheduledDate,
      startTime,
      endTime
    } = req.body;

    const imageUrl = req.file ? `/uploads/${req.file.filename}` : '';

    const newNudge: Nudge = {
      id: Date.now().toString(),
      title,
      description,
      eventId,
      imageUrl,
      scheduledDate: new Date(scheduledDate),
      startTime,
      endTime,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    nudges.push(newNudge);
    res.status(201).json(newNudge);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create nudge' });
  }
};

export const getNudges = (req: Request, res: Response) => {
  res.json(nudges);
};

export const getNudgeById = (req: Request, res: Response) => {
  const nudge = nudges.find(n => n.id === req.params.id);
  if (!nudge) {
    return res.status(404).json({ error: 'Nudge not found' });
  }
  res.json(nudge);
};