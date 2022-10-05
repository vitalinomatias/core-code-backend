const { pool } = require('../utils/db');

module.exports.create = ({ person, name, type }) => {
  const bindings = { person, name, type };
  const SQL_INSERT_CATEGORY = `INSERT INTO CATEGORY(CATEGORY, NAME, TYPE, PERSON)
                              VALUES(SQ_CATEGORY.NEXTVAL, :name, :type, :person)`;
  return pool(SQL_INSERT_CATEGORY, bindings, { autoCommit: true });
};

module.exports.fetchAll = ({ person }) => {
  const bindings = { person };
  const SQL_SELECT_CATEGORIES = `SELECT 
                                  CATEGORY AS "category", 
                                  NAME AS "name",
                                  TYPE AS "type", 
                                  ADD_DATE AS "add_date"
                                FROM CATEGORY
                                WHERE PERSON = :person
                                ORDER BY CATEGORY`;
  return pool(SQL_SELECT_CATEGORIES, bindings);
};

module.exports.findById = ({ person, category }) => {
  const bindings = { person, category };
  const SQL_SELECT_CATEGORY = `SELECT 
                                  CATEGORY AS "category", 
                                  NAME AS "name",
                                  TYPE AS "type", 
                                  ADD_DATE AS "add_date"
                                FROM CATEGORY
                                WHERE PERSON = :person
                                AND CATEGORY = :category`;
  return pool(SQL_SELECT_CATEGORY, bindings);
};
