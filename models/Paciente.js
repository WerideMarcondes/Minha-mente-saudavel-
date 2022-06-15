const Sequelize = require('Sequelize');
const connection = require('../database/database');


const Paciente = connection.define('users', {
    nome: { 
        type: Sequelize.STRING,
              allowNull: false
    },
    nascimento: { 
        type: Sequelize.STRING,
              allowNull: false
    },
    email: { 
        type: Sequelize.STRING,
              allowNull: false
    },
    senha: { 
        type: Sequelize.STRING,
              allowNull: false
    },
    cnpj: {
        type: Sequelize.STRING,
              allowNull: false
    },
    matricula: {
        type: Sequelize.STRING,
              allowNull: false
    },
    endereco: { 
        type: Sequelize.STRING,
              allowNull: false
    },
    cidade: { 
        type: Sequelize.STRING,
              allowNull: false
    },
    estado: { 
        type: Sequelize.STRING,
              allowNull: false
    },
    cpf: { 
        type: Sequelize.TEXT,
              allowNull: false
    },
    cfp: { 
        type: Sequelize.TEXT,
              allowNull: false
    },
    crm: { 
        type: Sequelize.TEXT,
              allowNull: false    },
    superuser: { 
        type: Sequelize.TEXT,
              allowNull: true
    },
    medicos: { 
        type: Sequelize.TEXT,
              allowNull: true
    },
    pin: { 
        type: Sequelize.TEXT,
              allowNull: true
    }
   
})

Paciente.sync({ alter: true });
module.exports = Paciente;