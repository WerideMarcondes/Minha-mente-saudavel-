const Sequelize = require('sequelize');
const connection = require('../database/database');

const Horarios = connection.define('Horarios', {
    horaINI: {
        type: Sequelize.STRING,
        allowNull: true
    },
    horaFIM: {
        type: Sequelize.STRING,
        allowNull: true
    }
});

Horarios.sync({alter: true})
module.exports = Horarios;