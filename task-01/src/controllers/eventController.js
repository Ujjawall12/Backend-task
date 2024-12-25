const { ObjectId } = require('mongodb');
const { getDB } = require('../config/db');
const { getPaginationParams } = require('../utils/pagination');

const getEvents = async (req, res) => {
  try {
    const { type } = req.query;
    const db = getDB();
    const { skip, limit } = getPaginationParams(req.query);
    
    const query = type ? { type } : {};
    const events = await db.collection('events')
      .find(query)
      .skip(skip)
      .limit(limit)
      .toArray();

    const total = await db.collection('events').countDocuments(query);

    res.json({
      events,
      total,
      page: Math.ceil(skip / limit) + 1,
      limit
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ... rest of the controller remains the same