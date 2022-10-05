const guard = require('../guard/guard');
const express = require('express');
const router = express.Router();

const {
    createAccount,
  getAccounts,
  getAccount,
  getInfoAccount
} = require('../controllers/account');

router.post('/account', guard, createAccount);

router.get('/account', guard, getAccounts);

router.get('/account/:id', guard, getAccount);
router.get('/account_info/:id', guard, getInfoAccount);

module.exports = router;
