const express = require('express');
const router = express.Router();
const transactionController = require('../controller/transactionController');
const auth = require('../middleware/authMiddleware');

router.post('/', auth, transactionController.createTransaction);
router.get('/', auth, transactionController.getTransactions);
router.put('/:id', auth, transactionController.updateTransaction);
router.delete('/:id', auth, transactionController.deleteTransaction);
router.get('/summary', auth, transactionController.getSummary);

module.exports = router;