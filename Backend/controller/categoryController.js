const Category = require("../models/categoryModel");

exports.createCategory = async (req, res) => {
    try {
        const {name} = req.body;
        const category = new Category({name: name, user: req.user.id});
        await category.save();
        res.status(201).json(category);
    } catch (error) {
        res.status(500).json({message: "Internal server error"});
    }
}

exports.getCategories = async (req, res) => {
    try {
        const categories = await Category.find({user: req.user.id});
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({message: "Internal server error"});
    }
}

exports.updateCategory = async (req, res) => {
    try {
        const {id} = req.params;
        const {name} = req.body;
        const category = await Category.findByIdAndUpdate(id, {name: name}, {new: true});
        if (!category) {
            return res.status(404).json({ error: 'Category not found' });
        }
        res.status(200).json(category); 
    } catch (error) {
        res.status(500).json({message: "Internal server error"});
    }
}

exports.deleteCategory = async (req, res) => {
    try {
        const {id} = req.params;
        const category = await Category.findByIdAndDelete(id);
        if (!category) {
            return res.status(404).json({ error: 'Category not found' });
        }
        res.status(200).json({message: "Category deleted successfully"});
    } catch (error) {
        res.status(500).json({message: "Internal server error"});
    }
}