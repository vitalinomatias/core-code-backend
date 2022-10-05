const Expense = require('../models/record')

module.exports.createExpense = async (req, res, next) => {
  const args = {
    person: req.person.person,
    category: req.body.category,
    type: 'Expense',
    account: req.body.account,
    total: Number(req.body.total),
    dates: req.body.dates,
    balance: 0,
    observation: req.body.observation
  };
  try {
    const { rows } = await Expense.balance(args)
    if (rows[0].balance >= args.total) {
        args.balance = Number(rows[0].balance) - Number(args.total)
        await Expense.create(args); 
        await Expense.updateBalance(args.balance, args.account)
        res.status(200).json({ status: true, message: 'Expense created!'});
    } else {
        res.status(400).json({ status: false, message: 'Saldo insuficiente'});
    }    
  } catch (error) {
    res.status(400).json({ status: false, message: error });
  }
};

module.exports.getExpenses = async (req, res, next) => {
  const args = {
    person: req.person.person,
    type: 'Expense'
  };
  try {
    const { rows } = await Expense.fetchAll(args);
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
