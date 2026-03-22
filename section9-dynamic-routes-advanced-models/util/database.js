const Sequelize = require("sequelize");

const sequelize = new Sequelize("node-complete", "user", "userpassword", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;
