const express = require('express');
const router = express.Router();
const controller = require('../controllers/booking.controller');
const validate = require('../middleware/validate.middleware');
const { createBooking } = require('../validators/booking.validator');
const { authMiddleware } = require('../middleware/auth.middleware');
const authorize = require('../middleware/authorize.middleware');

// create booking (user)
router.post('/', authMiddleware, authorize('USER'), validate(createBooking), controller.create);

// list bookings (admin)
router.get('/', authMiddleware, authorize('ADMIN'), controller.list);

// cancel booking (owner or admin)
router.post('/:id/cancel', authMiddleware, controller.cancel);

module.exports = router;
