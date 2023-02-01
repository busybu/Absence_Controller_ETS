const sequelize = require('sequelize');
//configurações da base de dados
const database = new sequelize('Absence_Controll', 'adm_absence_controll', 'etsds10243110',
{
dialect: 'mssql', host:'localhost', port: 1433
});

database.sync();
module.exports = database;