const Account = require('../models/account');

module.exports.createAccount = async (req, res, next) => {
  const args = {
    person: req.person.person,
    bank: req.body.bank,
    number_account: req.body.number_account,
    type_account: req.body.type_account,
    currency: req.body.currency,
    balance: req.body.balance,
  };
  try {
    await Account.create(args);
    res.status(200).json({ status: true, message: 'Account created!' });
  } catch (error) {
    res.status(400).json({ status: false, message: error });
  }
};

module.exports.getAccounts = async (req, res, next) => {
  const args = {
    person: req.person.person,
  };
  try {
    const { rows } = await Account.fetchAll(args);
    res.status(200).json({ status:true, data: rows });
  } catch (error) {
    res.status(400).json({ status:false, message: error });
  }
};

module.exports.getAccount = async (req, res, next) => {
  const args = { person: req.person.person, account: Number(req.params.id) };
  try {
    const { rows } = await Account.findById(args);
    res.status(200).json({ status:true, data: rows });
  } catch (error) {
    res.status(400).json({ status:false, message: error });
  }
};

module.exports.getInfoAccount = async (req, res, next) => {
  const args = { person: req.person.person, account: Number(req.params.id) };
  try {
    const { rows } = await Account.findByIdInfo(args);
    res.status(200).json({ status:true, data: rows });
  } catch (error) {
    res.status(400).json({ status:false, message: error });
  }
};
