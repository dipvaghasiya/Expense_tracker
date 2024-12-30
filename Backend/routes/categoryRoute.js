const express = require('express');
const router = express.Router();
const categoryController = require('../controller/categoryController');
const auth = require('../middleware/authMiddleware');

router.post('/', auth, categoryController.createCategory);
router.get('/', auth, categoryController.getCategories);
router.put('/:id', auth, categoryController.updateCategory);
router.delete('/:id', auth, categoryController.deleteCategory);

module.exports = router;