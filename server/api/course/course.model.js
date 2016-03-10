'use strict';

var sequelize = require('./../../config/config').sequelize;
var Sequelize = require('Sequelize');
var Professor = require('./../professor/professor.model');

var Course = sequelize.define('Course', {
		idCourse: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoiIncrement: true
		},
		name: {
			type: Sequelize.STRING
		},
		maxSeats: {
			type: Sequelize.INTEGER
		},
		type: {
			type: Sequelize.STRING
		},
		level: {
			type: Sequelize.INTEGER
		}
	},
	{
	freezeTableName: true, // Model tableName will be the same as the model name
	paranoid: true
});

Course.belongsTo(Professor, {foreignKey: 'Professor_professorId'}); // Ads Professor_professorId in Course


module.exports = Course;