const Transaction = require("../models/transactionModel");

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
          date: !date ? "Date is required" : null,
        },
      });
    }

    // Validate amount is a number
    if (isNaN(amount)) {
      return res.status(400).json({
        error: "Invalid amount",
        details: "Amount must be a number",
      });
    }

    // Create new transaction
    const transaction = new Transaction({
      amount: Number(amount),
      type,
      category,
      description: description || "",
      date: new Date(date),
      user: req.user._id,
    });

    const savedTransaction = await transaction.save();
    await savedTransaction.populate("category");

    res.status(201).json(savedTransaction);
  } catch (error) {
    console.error("Transaction creation error:", error);
    res.status(500).json({
      error: "Failed to create transaction",
      details: error.message,
      stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
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
    const transactions = await Transaction.find({ user: req.user._id });

    const summary = transactions.reduce(
      (acc, transaction) => {
        if (transaction.type === "income") {
          acc.totalIncome += transaction.amount;
        } else if (transaction.type === "expense") {
          acc.totalExpense += transaction.amount;
        }
        return acc;
      },
      { totalIncome: 0, totalExpense: 0 }
    );

    summary.balance = summary.totalIncome - summary.totalExpense;

    res.json(summary);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

exports.addTransaction = async (req, res) => {
  try {
    const transaction = new Transaction({
      ...req.body,
      user: req.user._id,
    });

    await transaction.save();

    res.status(201).json(transaction);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};
