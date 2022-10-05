const Category = require('../models/category');

module.exports.createCategory = async (req, res, next) => {
  const args = {
    person: req.person.person,
    name: req.body.name,
    type: req.body.type,
  };
  try {
    await Category.create(args);
    res.status(200).json({ status:true, message: 'Category created!' });
  } catch (error) {
    res.status(400).json({ status:false, message: error });
  }
};

module.exports.getCategories = async (req, res, next) => {
  const args = {
    person: req.person.person,
  };
  try {
    const { rows } = await Category.fetchAll(args);
    res.status(200).json({ status:true, data: rows });
  } catch (error) {
    res.status(400).json({ status:false, message: error });
  }
};

module.exports.getCategory = async (req, res, next) => {
  const args = { person: req.person.person, category: Number(req.params.id) };
  try {
    const { rows } = await Category.findById(args);
    res.status(200).json({ data: rows });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};
