const sequelize = require("sequelize");
//configurações da base de dados
const database = new sequelize(
  "Absence_Controll",
  "adm_absence_controll",
  "32787513",
  {
    dialect: "mssql",
    host: "localhost",
    port: 49675,
  }
);

database.sync();
module.exports = database;
