const { pool } = require('../utils/db');

module.exports.person = ({ person }) => {
  const bindings = { person };
  const SQL_SELECT_PERSON = `SELECT 
                                PERSON AS "person", 
                                FIRST_NAME AS "first_name", 
                                EMAIL AS "email"
                              FROM PERSON
                              WHERE PERSON = :person`;
  return pool(SQL_SELECT_PERSON, bindings);
};
