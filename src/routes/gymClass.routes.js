const express = require('express');
const router = express.Router();
const controller = require('../controllers/gymClass.controller');
const validate = require('../middleware/validate.middleware');
const { createClass, updateClass } = require('../validators/gymclass.validator');
const { authMiddleware } = require('../middleware/auth.middleware');
const authorize = require('../middleware/authorize.middleware');

// public list & get
router.get('/', controller.list);
router.get('/:id', controller.getById);

// create by admin
router.post('/', authMiddleware, authorize('ADMIN'), validate(createClass), controller.create);

// update/delete admin only
router.put('/:id', authMiddleware, authorize('ADMIN'), validate(updateClass), controller.update);
router.delete('/:id', authMiddleware, authorize('ADMIN'), controller.remove);

module.exports = router;
