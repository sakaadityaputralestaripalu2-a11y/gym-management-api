const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  return res.json({
    success: true,
    message: 'Gym Management API - v1',
  });
});

module.exports = router;
