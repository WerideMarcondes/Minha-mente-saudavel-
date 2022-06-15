const Sequelize = require('sequelize');

const connecton = new Sequelize('mentesaudavel', 'root', '433743', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false
})

module.exports = connecton;