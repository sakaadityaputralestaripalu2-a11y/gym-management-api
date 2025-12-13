const express = require('express');
const router = express.Router();

const controller = require('../controllers/member.controller');
const validate = require('../middleware/validate.middleware');
const { createMember, updateMember } = require('../validators/member.validator');
const { authMiddleware } = require('../middleware/auth.middleware');
const authorize = require('../middleware/authorize.middleware');
const checkOwnership = require('../middleware/ownership.middleware');

// ===================
// PUBLIC ROUTES
// ===================
router.get('/', controller.list);
router.get('/:id', controller.getById);

// ===================
// PROTECTED ROUTES
// ===================
router.post(
  '/',
  authMiddleware,
  authorize('USER'),
  validate(createMember),
  controller.create
);

// UPDATE MEMBER (OWNER / ADMIN)
router.put(
  '/:id',
  authMiddleware,
  checkOwnership('member'),
  validate(updateMember),
  controller.update
);

// DELETE MEMBER (OWNER / ADMIN)
router.delete(
  '/:id',
  authMiddleware,
  checkOwnership('member'),
  controller.remove
);

module.exports = router;
