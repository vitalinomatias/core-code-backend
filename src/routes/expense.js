const guard = require('../guard/guard');
const express = require('express');
const router = express.Router();

const {
    createExpense,
    getExpenses,
//   getAccount,
} = require('../controllers/expense');

router.post('/expense', guard, createExpense);

router.get('/expense', guard, getExpenses);

// router.get('/account/:id', guard, getAccount);

module.exports = router;
