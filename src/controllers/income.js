const Income = require('../models/record')

module.exports.createIncome = async (req, res, next) => {
  const args = {
    person: req.person.person,
    category: req.body.category,
    type: "Income",
    account: req.body.account,
    total: Number(req.body.total),
    dates: req.body.dates,
    balance: 0,
    observation: req.body.observation
};
  try {
    const { rows } = await Income.balance(args)
    args.balance = args.total + Number(rows[0].balance)
    await Income.create(args); 
    await Income.updateBalance(args.balance, args.account)
    res.status(200).json({ status: true, message: 'Income created!'});
    
  } catch (error) {
    res.status(400).json({ status: false, message: error });
  }
};

module.exports.getIncomes = async (req, res, next) => {
  const args = {
    person: req.person.person,
    type: "Income"
  };
  try {
    const { rows } = await Income.fetchAll(args);
    res.status(200).json({ status:true, data: rows });
  } catch (error) {
    res.status(400).json({ status:false, message: error });
  }
};

module.exports.getAccount = async (req, res, next) => {
  const args = { person: req.person.person, account: Number(req.params.id) };
  try {
    const { rows } = await Account.findById(args);
    res.status(200).json({ data: rows });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};
