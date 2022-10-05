const guard = require('../guard/guard');
const express = require('express');
const router = express.Router();

const {
    createIncome,
    getIncomes,
//   getAccount,
} = require('../controllers/income');

router.post('/income', guard, createIncome);

router.get('/income', guard, getIncomes);

// router.get('/account/:id', guard, getAccount);

module.exports = router;
