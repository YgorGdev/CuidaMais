const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Secretaria = sequelize.define('Secretaria', {
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  senha: {
    type: DataTypes.STRING,
    allowNull: false,
  }
}, {
  tableName: 'secretarias',
  timestamps: true,
});

module.exports = Secretaria;
