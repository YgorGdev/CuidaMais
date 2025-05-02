const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Medicamento = sequelize.define('Medicamento', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    idosoId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Idosos',
            key: 'id'
        }
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    dosagem: {
        type: DataTypes.STRING,
        allowNull: false
    },
    horario: {
        type: DataTypes.STRING,
        allowNull: false
    },
    instrucoes: {
        type: DataTypes.TEXT,
        allowNull: true
    }
});

module.exports = Medicamento; 