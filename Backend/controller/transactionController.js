const Transaction = require("../models/transactionModel");

const checkAlerts = async (categoryId, userId) => {
  const category = await Category.findById(categoryId);
  if (category.alertLimit > 0) {
    const totalExpenses = await Transaction.aggregate([
      { $match: { category: categoryId, user: userId, type: "expense" } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    const currentExpense = totalExpenses[0]?.total || 0;
    const percentage = (currentExpense / category.alertLimit) * 100;

    if (percentage >= 90) {
      console.log("Alert: 90% of limit reached for category:", category.name);
    } else if (percentage >= 50) {
      console.log("Alert: 50% of limit reached for category:", category.name);
    }
  }
};

exports.createTransaction = async (req, res) => {
  try {
    const { amount, type, category, description, date } = req.body;

    // Validate required fields
    if (!amount || !type || !category || !date) {
      return res.status(400).json({
        error: "Missing required fields",
        details: {
          amount: !amount ? "Amount is required" : null,
          type: !type ? "Type is required" : null,
          category: !category ? "Category is required" : null,
          date: !date ? "Date is required" : null
        }
      });
    }

    // Validate amount is a number
    if (isNaN(amount)) {
      return res.status(400).json({
        error: "Invalid amount",
        details: "Amount must be a number"
      });
    }

    // Create new transaction
    const transaction = new Transaction({
      amount: Number(amount),
      type,
      category,
      description: description || "",
      date: new Date(date),
      user: req.user._id
    });

    const savedTransaction = await transaction.save();
    await savedTransaction.populate('category');
    
    res.status(201).json(savedTransaction);
  } catch (error) {
    console.error('Transaction creation error:', error);
    res.status(500).json({ 
      error: "Failed to create transaction",
      details: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
};

exports.getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({ user: req.user.id }).populate(
      "category"
    );
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.updateTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const { amount, type, category, description } = req.body;
    const transaction = await Transaction.findByIdAndUpdate(
      id,
      {
        amount: amount,
        type: type,
        category: category,
        description: description,
      },
      { new: true }
    );
    if (!transaction) {
      return res.status(404).json({ error: "Transaction not found" });
    }
    res.status(200).json(transaction);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.deleteTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    await Transaction.findByIdAndDelete(id);
    res.status(200).json({ message: "Transaction deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getSummary = async (req, res) => {
  try {
    const transactions = await Transaction.find({ user: req.user.id });

    const summary = transactions.reduce(
      (acc, transaction) => {
        if (transaction.type === "income") {
          acc.income += transaction.amount;
        } else {
          acc.expense += transaction.amount;
        }
        return acc;
      },
      { income: 0, expense: 0 }
    );

    summary.balance = summary.income - summary.expense;

    res.status(200).json(summary);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
