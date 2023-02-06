const { DATEONLY } = require('sequelize');
const Sequelize = require('sequelize');
const database = require('../config/db');
const administrador = require('./Administrador');
const turma = require('./Turma');

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
    },
    Descricao: {
        type: Sequelize.STRING(255),
        allowNull: true
    },
    Motivo: {
        type: Sequelize.STRING(255),
        allowNull: false
    },
    Arquivo: {
        type: Sequelize.STRING(50),
        allowNull: true,
    },
    Status: {
        type: Sequelize.INTEGER,   
    }
});

module.exports = formulario;

formulario.belongsTo(turma, {
    constraint: true,
    foreignKey: "IdTurma"
});

formulario.belongsTo(administrador,
    {
        constraint: true,
        foreignKey: "IdAdmConferiu"
});