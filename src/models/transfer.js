const { pool } = require('../utils/db');

module.exports.create = ({ person, debit_account, credit_account, description, total, date_transfer }) => {
  const bindings = { person, debit_account, credit_account, description, total, date_transfer };
  const SQL_INSERT_TRANSFER = `INSERT INTO TRANSFER (TRANSFER, DEBIT_ACCOUNT, CREDIT_ACCOUNT, DESCRIPTION, TOTAL, DATE_TRANSFER, PERSON)
                                VALUES (SQ_TRANSFER.NEXTVAL, :debit_account, :credit_account, :description, :total, :date_transfer, :person)`;
  return pool(SQL_INSERT_TRANSFER, bindings, { autoCommit: true });
};

module.exports.debit = (account) => {
    const bindings = { account };
    const SQL_SELECT_DEBIT = `SELECT BALANCE AS "balance", CURRENCY AS "currency" FROM ACCOUNT WHERE ACCOUNT = :account`;
    return pool(SQL_SELECT_DEBIT, bindings, { autoCommit: true });
    };

module.exports.credit = (account) => {
    const bindings = { account };
    const SQL_SELECT_CREDIT = `SELECT BALANCE AS "balance", CURRENCY AS "currency" FROM ACCOUNT WHERE ACCOUNT = :account`;
    return pool(SQL_SELECT_CREDIT, bindings, { autoCommit: true });
};

module.exports.fetchAll = ({ person }) => {
    const bindings = { person };
    const SQL_SELECT_TRANSFERS = `SELECT 
                                    t.TRANSFER AS "transfer",
                                    t.DEBIT_ACCOUNT AS "debit_account",
                                    a.BANK AS "bank_debit",
                                    a.NUMBER_ACCOUNT AS "number_debit_account",
                                    t.CREDIT_ACCOUNT AS "credit_account",
                                    a2.BANK AS "bank_credit",
                                    a2.NUMBER_ACCOUNT AS "number_credit_account",
                                    t.DESCRIPTION AS "description",
                                    t.DATE_TRANSFER AS "date",
                                    t.TOTAL AS "total"
                                  FROM TRANSFER t
                                  INNER JOIN ACCOUNT a ON a.ACCOUNT = t.DEBIT_ACCOUNT
                                  INNER JOIN ACCOUNT a2 on a2.ACCOUNT = t.CREDIT_ACCOUNT
                                  WHERE t.PERSON = :person
                                  ORDER BY t.TRANSFER ASC`;
    return pool(SQL_SELECT_TRANSFERS, bindings);
  };
