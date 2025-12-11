const express = require('express');
const router = express.Router();
const controller = require('../controllers/member.controller');
const validate = require('../middleware/validate.middleware');
const { createMember, updateMember } = require('../validators/member.validator');
const { authMiddleware } = require('../middleware/auth.middleware');
const authorize = require('../middleware/authorize.middleware');
const checkOwnership = require('../middleware/ownership.middleware');

// public list & read
router.get('/', controller.list);
router.get('/:id', controller.getById);

// create (auth required)
router.post('/', authMiddleware, authorize('USER'), validate(createMember), controller.create);

// update/delete only owner or admin
router.put('/:id', authMiddleware, checkOwnership('member'), validate(updateMember), controller.update);
router.delete('/:id', authMiddleware, checkOwnership('member'), controller.remove);

module.exports = router;
