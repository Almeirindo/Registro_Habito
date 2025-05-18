const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Frequencia = sequelize.define('Frequencia', {
    nome: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
});

module.exports = Frequencia;
