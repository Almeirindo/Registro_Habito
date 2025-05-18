const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const StatusRegistro = sequelize.define('StatusRegistro', {
    nome: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
});

module.exports = StatusRegistro;
