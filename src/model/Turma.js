const { DATEONLY } = require('sequelize');
const Sequelize = require('sequelize');
const database = require('../config/db');

//Craindo a tabela Turmas

const turma = database.define('Turma', {
    ID: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    Nome: {
        type: Sequelize.STRING(100),
        allowNull: false, 
    },
    Inicio: {
        type: DATEONLY,
        allowNull: false
    },
    Fim: {
        type: DATEONLY,
        allowNull: false
    }
});

module.exports = turma;