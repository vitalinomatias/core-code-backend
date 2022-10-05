const Record = require('../models/record');

module.exports.getRecords = async (req, res, next) => {
  const args = {
    person: req.person.person,
  };
  try {
    const { rows } = await Record.All(args);
    res.status(200).json({ status:true, data: rows });
  } catch (error) {
    res.status(400).json({ status:false, message: error });
  }
};

