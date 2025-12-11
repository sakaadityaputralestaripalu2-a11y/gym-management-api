const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({ success: true, message: 'Gym Management API - v1' });
});

console.log('>> routes/index.js loading - about to mount /auth');
router.use('/auth', require('./auth.routes'));
console.log('>> routes/index.js mounted /auth');

router.use('/auth', require('./auth.routes'));
router.use('/plans', require('./membershipPlan.routes'));
router.use('/members', require('./member.routes'));
router.use('/classes', require('./gymClass.routes'));
router.use('/bookings', require('./booking.routes'));

module.exports = router;
