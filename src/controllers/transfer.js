const Transfer = require('../models/transfer')
const Expense = require('../models/record')
const Income = require('../models/record')

module.exports.createTransfer = async (req, res, next) => {
  const args = {
    person: req.person.person,
    debit_account:  req.body.debit_account,
    credit_account: req.body.credit_account,
    description: req.body.description,
    total: req.body.total,
    date_transfer: req.body.date_transfer,
  };
  try {
    const debit = await Transfer.debit(args.debit_account)
    const credit = await Transfer.credit(args.credit_account)
    const currency = {
        status: debit.rows[0].currency === credit.rows[0].currency,
        first: debit.rows[0].currency,
        second: credit.rows[0].currency
    } 
    const exchange  = 7.80

    if (debit.rows[0].balance >= args.total) {
        if (currency.status){
            await transfer(args, req, debit, credit, currency, exchange)
            res.status(200).json({ status: true, message: 'Transfer created!'});
        } else {
            await transfer(args, req, debit, credit, currency, exchange)
            res.status(200).json({ status: true, message: 'Transfer created!'});
        }
    } else {
        res.status(400).json({ status: false, message: 'Saldo insuficiente'});
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: false, message: error });
    
  }
};

module.exports.getTransfers = async (req, res, next) => {
  const args = {
    person: req.person.person,
  };
  try {
    const { rows } = await Transfer.fetchAll(args);
    res.status(200).json({ status:true, data: rows });
  } catch (error) {
    res.status(400).json({ status:false, message: error });
  }
};


const expenses = (req) => {
    const expense = {
        person: req.person.person,
        category: 'Transferencia',
        type: 'Expense',
        account: req.body.debit_account,
        total: Number(req.body.total),
        dates: req.body.date_transfer,
        balance:0,
        observation: ''
    }
    return expense
}

const incomes = (req, total) =>{
    const income = {
        person: req.person.person,
        category: 'Transferencia',
        type: 'Income',
        account: req.body.credit_account,
        total: Number(total),
        dates: req.body.date_transfer,
        balance: 0,
        observation: ''
    }
    return income
}

const transfer = async (args, req, debit, credit, currency, exchange) => {
    await Transfer.create(args); 
    var total = 0
    if (!currency.status){
        total = (currency.first === 'Quetzales' ? Number(args.total/exchange).toFixed(2) : Number(args.total*exchange).toFixed(2))

        args.total = Number(total)
    }
    const expense = expenses(req);
    const income = currency.status ? incomes(req, req.body.total) : incomes(req, Number(total))
    
    expense.balance = currency.status ? Number(debit.rows[0].balance) - Number(args.total) : Number(debit.rows[0].balance) - Number(req.body.total)
    income.balance = currency.status ? Number(credit.rows[0].balance) + Number(args.total) : Number(credit.rows[0].balance) + Number(total)
    
    await Expense.create(expense); 
    await Expense.updateBalance(expense.balance, args.debit_account)
    await Income.create(income); 
    await Income.updateBalance(income.balance, args.credit_account)
}
