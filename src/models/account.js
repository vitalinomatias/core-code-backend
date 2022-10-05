const { pool } = require('../utils/db');

module.exports.create = ({ person, bank, number_account, type_account, currency, balance }) => {
  const bindings = { person, bank, number_account, type_account, currency, balance };
  const SQL_INSERT_ACCOUNT = `INSERT INTO ACCOUNT(ACCOUNT, BANK, NUMBER_ACCOUNT, TYPE_ACCOUNT, CURRENCY, BALANCE, PERSON)
                              VALUES(SQ_ACCOUNT.NEXTVAL, :bank, :number_account, :type_account, :currency, :balance, :person)`;
  return pool(SQL_INSERT_ACCOUNT, bindings, { autoCommit: true });
};

module.exports.fetchAll = ({ person }) => {
    const bindings = { person };
    const SQL_SELECT_ACCOUNTS = `SELECT
                                    ACCOUNT AS "account",
                                    BANK AS "bank",
                                    NUMBER_ACCOUNT AS "number_account",
                                    TYPE_ACCOUNT AS "type_account",
                                    CURRENCY AS "currency",
                                    BALANCE AS "balance"
                                  FROM ACCOUNT
                                  WHERE PERSON = :person
                                  ORDER BY ACCOUNT ASC`;
    return pool(SQL_SELECT_ACCOUNTS, bindings);
  };

module.exports.findById = ({ person, account }) => {
  const bindings = { person, account };

  const SQL_SELECT_ACCOUNT = `SELECT 
                                RECORD AS "record",
                                CATEGORY AS "category",
                                TYPE AS "type",
                                TOTAL AS "total",
                                DATES AS "dates",
                                BALANCE AS "balance"
                                FROM RECORD
                                WHERE PERSON = :person AND ACCOUNT = :account
                                ORDER BY DATES`;
  return pool(SQL_SELECT_ACCOUNT, bindings);
};

module.exports.findByIdInfo = ({ person, account }) => {
  const bindings = { person, account };

  const SQL_SELECT_ACCOUNT = `SELECT 
                                BANK AS "bank",
                                NUMBER_ACCOUNT AS "number",
                                TYPE_ACCOUNT AS "type",
                                CURRENCY AS "currency"
                                FROM ACCOUNT
                                WHERE PERSON = :person AND ACCOUNT = :account`;
  return pool(SQL_SELECT_ACCOUNT, bindings);
};
