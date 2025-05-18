const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const StatusRegistro = require('./StatusRegistro');
const Habito = require('./Habito');

const Registro = sequelize.define('Registro', {
    data: {
        type: DataTypes.DATEONLY,
        allowNull: false
    }
});

// Associations
Registro.belongsTo(StatusRegistro, { foreignKey: 'status_id' });
Registro.belongsTo(Habito, { foreignKey: 'habito_id' });

module.exports = Registro;
