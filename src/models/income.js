const { pool } = require('../utils/db');

module.exports.create = ({ person, category, type, account, total, dates, balance }) => {
    const bindings = { person, category, type, account, total, dates, balance };
  
    const SQL_INSERT_STATEMENT = `INSERT INTO STATEMENT (STATEMENT, CATEGORY, TYPE, ACCOUNT, TOTAL, DATES, BALANCE, PERSON)
                                  VALUES (SQ_STATEMENT.NEXTVAL, :category, :type, :account, :total, :dates, :balance, :person)`;
    return pool(SQL_INSERT_STATEMENT, bindings, { autoCommit: true });
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
    const SQL_SELECT_INCOMES = `SELECT 
                                    INCOME.INCOME AS "income",
                                    INCOME.CATEGORY AS "category",
                                    INCOME.ACCOUNT AS "account",
                                    ACCOUNT.BANK AS "bank",
                                    ACCOUNT.NUMBER_ACCOUNT AS "number_account",
                                    INCOME.TOTAL AS "total",
                                    INCOME.DATE_INCOME AS "date"
                                  FROM INCOME
                                  INNER JOIN ACCOUNT ON ACCOUNT.ACCOUNT = INCOME.ACCOUNT
                                  WHERE INCOME.PERSON = :person
                                  ORDER BY INCOME.INCOME ASC`;
    return pool(SQL_SELECT_INCOMES, bindings);
  };