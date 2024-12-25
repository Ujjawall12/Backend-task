const validateEvent = (req, res, next) => {
  const { name, tagline, schedule, description, moderator, category, sub_category, rigor_rank } = req.body;
  
  if (!name || !tagline || !schedule || !description || !moderator || !category || !sub_category) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  // Validate schedule format (assuming it's a timestamp)
  const scheduleDate = new Date(schedule);
  if (isNaN(scheduleDate.getTime())) {
    return res.status(400).json({ error: 'Invalid schedule format' });
  }

  // Validate rigor_rank is a number if provided
  if (rigor_rank && typeof rigor_rank !== 'number') {
    return res.status(400).json({ error: 'rigor_rank must be a number' });
  }

  next();
};