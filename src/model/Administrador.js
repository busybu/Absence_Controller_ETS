const { BOOLEAN } = require('sequelize');
const Sequelize = require('sequelize');
const database = require('../config/db');

//Craindo a tabela Turmas

const administrador = database.define('Administrador', {
    EDV: {
        type: Sequelize.STRING(10),
        autoIncrement: false,
        allowNull: false,
        primaryKey: true
    },
    Nome: {
        type: Sequelize.STRING(255),
        allowNull: false
    },
    Senha: {
        type: Sequelize.STRING(50),
        allowNull: false
    },
    Master: {
        type: BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    Ativo: {
        type: BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
});

module.exports = administrador;