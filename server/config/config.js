'use strict';

var Sequelize = require('Sequelize');

exports.sequelize = new Sequelize('mydb', 'root', process.env.dbPassword || '', {
  host: 'localhost',
  dialect: 'mysql'
});