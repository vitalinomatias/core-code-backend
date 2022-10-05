const guard = require('../guard/guard');
const express = require('express');
const router = express.Router();

const {
    createTransfer,
    getTransfers,
//   getAccount,
} = require('../controllers/transfer');

router.post('/transfer', guard, createTransfer);

router.get('/transfer', guard, getTransfers);

// router.get('/account/:id', guard, getAccount);

module.exports = router;
