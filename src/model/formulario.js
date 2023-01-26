const { DATEONLY } = require('sequelize');
const Sequelize = require('sequelize');
const database = require('../config/db');

//Craindo a tabela formularios

const formulario = database.define('Formulario', {
    ID: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    EDV: {
        type: Sequelize.STRING(10),
        allowNull: false
    },
    Nome: {
        type: Sequelize.STRING(255),
        allowNull: false
    },
    Inicio: {
        type: DATEONLY,
        allowNull: false
    },
    Fim: {
        type: DATEONLY,
        allowNull: false
    }

}
)

// const sala = database.define('Sala', {
// IDSala: {
// type: Sequelize.INTEGER,
// autoIncrement: true,
// allowNull: false,
// primaryKey: true
// },
// Nome: {
// type: Sequelize.STRING(50),
// allowNull: false
// },
// Capacidade: {
// type: Sequelize.INTEGER,
// allowNull: false
// }
// });
// // Exportando essa tabela
// module.exports