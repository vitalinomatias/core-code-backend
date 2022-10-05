const guard = require('../guard/guard');
const express = require('express');
const router = express.Router();

const {
  getRecords
} = require('../controllers/record');

router.get('/record', guard, getRecords);

module.exports = router;
