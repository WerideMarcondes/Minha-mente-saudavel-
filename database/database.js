const Sequelize = require('sequelize');

const connecton = new Sequelize('mentesaudavel', 'root', '1234', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false
})

module.exports = connecton;