'use strict';

var sequelize = require('./../../config/config').sequelize;
var Sequelize = require('Sequelize');

var Schedule = require('./../schedule/schedule.model');

var Quizz = sequelize.define('Quizz', {
		idQuizz: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoiIncrement: true
		},
		name: {
			type: Sequelize.STRING
		},
		topic: {
			type: Sequelize.STRING
		}
	},
	{
	freezeTableName: true, // Model tableName will be the same as the model name
	paranoid: true
});

Quizz.belongsTo(Schedule, {foreignKey: 'Schedule_idSchedule'}); // Ads Schedule_idSchedule in Quizz

module.exports = Quizz;