const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');
const validateEvent = require('../middleware/validateEvent');

router.get('/events', eventController.getEvents);
router.get('/events/:id', eventController.getEventById);
router.post('/events', validateEvent, eventController.createEvent);
router.put('/events/:id', validateEvent, eventController.updateEvent);
router.delete('/events/:id', eventController.deleteEvent);

module.exports = router;