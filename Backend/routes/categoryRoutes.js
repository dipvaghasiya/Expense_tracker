const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { createCategory, getCategories, updateCategoryLimit } = require('../controllers/categoryController');

router.post('/', protect, createCategory);
router.get('/', protect, getCategories);
router.put('/categories/:id/limit', updateCategoryLimit);

module.exports = router; 