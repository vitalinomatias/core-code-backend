const { pool } = require('../utils/db');

module.exports.create = ({ person, category, type, account, total, dates, balance, observation }) => {
    const bindings = { person, category, type, account, total, dates, balance, observation };
    const SQL_INSERT_RECORD = `INSERT INTO RECORD (RECORD, CATEGORY, TYPE, ACCOUNT, TOTAL, DATES, BALANCE, PERSON, OBSERVATION)
                                  VALUES (SQ_RECORD.NEXTVAL, :category, :type, :account, :total, :dates, :balance, :person, :observation)`;
    return pool(SQL_INSERT_RECORD, bindings, { autoCommit: true });
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

module.exports.fetchAll = ({ person, type }) => {
    const bindings = { person, type };
    const SQL_SELECT_RECORDS = `SELECT 
                                    s.RECORD AS "record",
                                    s.TYPE AS "type",
                                    s.CATEGORY AS "category",
                                    s.ACCOUNT AS "account",
                                    a.BANK AS "bank",
                                    a.NUMBER_ACCOUNT AS "number_account",
                                    s.TOTAL AS "total",
                                    s.DATES AS "date",
                                    s.OBSERVATION AS "observation"  
                                  FROM RECORD s
                                  INNER JOIN ACCOUNT a ON a.ACCOUNT = s.ACCOUNT
                                  WHERE s.PERSON = :person AND s.TYPE = :type
                                  ORDER BY s.RECORD ASC`;
    return pool(SQL_SELECT_RECORDS, bindings);
  };

  module.exports.All = ({ person }) => {
    const bindings = { person };
    const SQL_SELECT_RECORDS = `SELECT 
                                    s.RECORD AS "record",
                                    s.TYPE AS "type",
                                    s.CATEGORY AS "category",
                                    s.ACCOUNT AS "account",
                                    a.BANK AS "bank",
                                    a.NUMBER_ACCOUNT AS "number_account",
                                    s.TOTAL AS "total",
                                    s.DATES AS "date",
                                    s.OBSERVATION AS "observation"  
                                  FROM RECORD s
                                  INNER JOIN ACCOUNT a ON a.ACCOUNT = s.ACCOUNT
                                  WHERE s.PERSON = :person
                                  ORDER BY s.RECORD ASC`;
    return pool(SQL_SELECT_RECORDS, bindings);
  };