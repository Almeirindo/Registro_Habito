const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Frequencia = require('./Frequencia');
const Usuario = require('./Usuario');

const Habito = sequelize.define('Habito', {
    titulo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    descricao: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    criado_em: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
});

// Associations
Habito.belongsTo(Frequencia, { foreignKey: 'frequencia_id' });
Habito.belongsTo(Usuario, { foreignKey: 'usuario_id' });

module.exports = Habito;
