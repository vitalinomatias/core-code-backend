const { pool } = require('../utils/db');

module.exports.create = ({ person, category, account, total, date_expense }) => {
  const bindings = { person, category, account, total, date_expense };
  const SQL_INSERT_EXPENSE = `INSERT INTO EXPENSE (EXPENSE, CATEGORY, ACCOUNT, TOTAL, PERSON, DATE_EXPENSE)
                                VALUES (SQ_EXPENSE.NEXTVAL, :category, :account, :total, :person, :date_expense)`;
  return pool(SQL_INSERT_EXPENSE, bindings, { autoCommit: true });
};

module.exports.balance = ({ account }) => {
const bindings = { account };
const SQL_SELECT_BALANCE = `SELECT BALANCE AS "balance" FROM ACCOUNT WHERE ACCOUNT = :account`;
return pool(SQL_SELECT_BALANCE, bindings, { autoCommit: true });
};

module.exports.updateBalance = (balance, account) => {
    const bindings = { balance, account };
    const SQL_UPDATE_BALANCE = `UPDATE ACCOUNT SET BALANCE = :balance WHERE ACCOUNT = :account`;
    return pool(SQL_UPDATE_BALANCE, bindings, { autoCommit: true });
    };

module.exports.fetchAll = ({ person }) => {
    const bindings = { person };
    const SQL_SELECT_EXPENSES = `SELECT 
                                    EXPENSE.EXPENSE AS "expense",
                                    EXPENSE.CATEGORY AS "category",
                                    EXPENSE.ACCOUNT AS "account",
                                    ACCOUNT.BANK AS "bank",
                                    ACCOUNT.NUMBER_ACCOUNT AS "number_account",
                                    EXPENSE.TOTAL AS "total",
                                    EXPENSE.DATE_EXPENSE AS "date"
                                  FROM EXPENSE
                                  INNER JOIN ACCOUNT ON ACCOUNT.ACCOUNT = EXPENSE.ACCOUNT
                                  WHERE EXPENSE.PERSON = :person
                                  ORDER BY EXPENSE.EXPENSE ASC`;
    return pool(SQL_SELECT_EXPENSES, bindings);
  };