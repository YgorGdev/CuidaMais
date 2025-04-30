const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Registro = sequelize.define('Registro', {
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
    tipo: {
        type: DataTypes.ENUM('entrada', 'saida'),
        allowNull: false
    },
    data: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    hora: {
        type: DataTypes.TIME,
        allowNull: false
    },
    observacoes: {
        type: DataTypes.TEXT,
        allowNull: true
    }
});

module.exports = Registro; 