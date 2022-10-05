const guard = require('../guard/guard');
const express = require('express');
const router = express.Router();

const {
  createCategory,
  getCategories,
  getCategory,
} = require('../controllers/category');

router.post('/category', guard, createCategory);

router.get('/category', guard, getCategories);

router.get('/category/:id', guard, getCategory);

module.exports = router;
