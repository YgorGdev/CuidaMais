const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Adicione os modelos aqui

module.exports = db;
