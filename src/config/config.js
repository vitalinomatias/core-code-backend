const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  server: {
    port: process.env.SERVER_PORT,
  },
  oracle: {
    user: process.env.ORACLE_USER,
    password: process.env.ORACLE_PASSWORD,
    connectString: process.env.ORACLE_CONNSTR,
    // connectString: "172.28.0.2:1521/xepdb1",
    poolMin: 10,
    poolMax: 10,
    poolIncrement: 0,
  },
  auth: {
    token: process.env.AUTH_TOKEN,
  },
};
