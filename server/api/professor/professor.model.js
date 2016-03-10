'use strict';

var sequelize = require('./../../config/config').sequelize;
var Sequelize = require('Sequelize');

var Professor = sequelize.define('Professor', {
		professorId: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoiIncrement: true
		},
		firstName: {
			type: Sequelize.STRING
		},
		lastName: {
			type: Sequelize.STRING
		},
		zipCode: {
			type: Sequelize.INTEGER
		},
		streetAddress: {
			type: Sequelize.STRING
		},
		phoneNumber: {
			type: Sequelize.STRING
		},
		email: {
			type: Sequelize.STRING
		},
		city: {
			type: Sequelize.STRING
		},
		degree: {
			type: Sequelize.STRING
		}
	},
	{
	freezeTableName: true, // Model tableName will be the same as the model name
	paranoid: true
});

module.exports = Professor;