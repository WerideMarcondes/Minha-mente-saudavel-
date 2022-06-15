const sequelize = require('sequelize');
const Sequelize = require('sequelize');
const connection = require('../database/database');
const Paciente = require('../models/Paciente');

const Consulta = connection.define('consulta', {
    datamarc: {
        type: Sequelize.STRING,
        allowNull: true
    },
    horaini: {
        type: Sequelize.STRING,
        allowNull: true
    },
    horafim: {
        type: Sequelize.STRING,
        allowNull: true
    },

    status: {
        type: Sequelize.STRING,
        allowNull: true
    },
    idprofissional: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    idpaciente: {
        type: Sequelize.INTEGER,
        allowNull: true
    }
    
});


Consulta.sync({alter: true})
module.exports = Consulta;
