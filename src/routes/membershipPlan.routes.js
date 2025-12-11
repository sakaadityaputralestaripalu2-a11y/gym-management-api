const express = require('express');
const router = express.Router();
const controller = require('../controllers/membershipPlan.controller');
const validate = require('../middleware/validate.middleware');
const { createPlan, updatePlan } = require('../validators/membershipPlan.validator');
const { authMiddleware } = require('../middleware/auth.middleware');
const authorize = require('../middleware/authorize.middleware');

// List and public read
router.get('/', controller.list);
router.get('/:id', controller.getById);

// Create (auth required, USER or ADMIN allowed)
router.post('/', authMiddleware, authorize('USER'), validate(createPlan), controller.create);

// Update (admin only)
router.put('/:id', authMiddleware, authorize('ADMIN'), validate(updatePlan), controller.update);
router.delete('/:id', authMiddleware, authorize('ADMIN'), controller.remove);

module.exports = router;
