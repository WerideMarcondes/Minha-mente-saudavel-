const Sequelize = require('sequelize');
const connection = require('../database/database');

const AgendaMedicos = connection.define('agenda', {


    data: {
        type: Sequelize.STRING,
        allowNull: false
    },

    hora: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

AgendaMedicos.sync({alter: true})
module.exports = AgendaMedicos;
