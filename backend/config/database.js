const { Sequelize } = require('sequelize');

// Ajuste com seus dados do MySQL Workbench
const sequelize = new Sequelize('registro_habitos', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = sequelize;
