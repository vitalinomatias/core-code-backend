const { pool } = require('../utils/db');

module.exports.register = ({ first_name, email, password }) => {
  const bindings = { first_name, email, password };
  const SQL_INSERT_PERSON = `INSERT INTO PERSON(PERSON, FIRST_NAME, EMAIL, PASSWORD)
                            VALUES(SQ_PERSON.NEXTVAL, :first_name, :email, :password)`;
  return pool(SQL_INSERT_PERSON, bindings, { autoCommit: true });
};

module.exports.login = ({ email }) => {
  const bindings = { email };
  const SQL_SELECT_PERSON = `SELECT 
                                PERSON AS "person", 
                                FIRST_NAME AS "first_name", 
                                EMAIL AS "email", 
                                PASSWORD AS "password"
                            FROM PERSON
                            WHERE EMAIL = :email`;
  return pool(SQL_SELECT_PERSON, bindings);
};
