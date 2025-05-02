const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Importando os modelos
const Idoso = require('./Idoso');
const Medicamento = require('./Medicamento');
const Registro = require('./Registro');

// Adicionando os modelos ao objeto db
db.Idoso = Idoso;
db.Medicamento = Medicamento;
db.Registro = Registro;

// Definindo as associações
Idoso.hasMany(Medicamento, { foreignKey: 'idosoId' });
Medicamento.belongsTo(Idoso, { foreignKey: 'idosoId' });

Idoso.hasMany(Registro, { foreignKey: 'idosoId' });
Registro.belongsTo(Idoso, { foreignKey: 'idosoId' });

module.exports = db;
