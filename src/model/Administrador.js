const { BOOLEAN } = require('sequelize');
const Sequelize = require('sequelize');
const database = require('../config/db');

//Craindo a tabela Turmas

const administrador = database.define('Administrador', {
    EDV: {
        type: Sequelize.STRING(10),
        autoIncrement: false,
        allowNull: false,
        primaryKey: true,
        unique: true
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
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: false
    },
    Ativo: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: false
    }
    // Colocar foto futuramente
});

module.exports = administrador;