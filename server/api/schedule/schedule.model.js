'use strict';

var sequelize = require('./../../config/config').sequelize;
var Sequelize = require('Sequelize');
var Course = require('./../course/course.model');
var Room = require('./../room/room.model');

var Schedule = sequelize.define('Schedule', {
		idSchedule: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoiIncrement: true
		},
		startDate: {
			type: Sequelize.DATE
		},
		endDate: {
			type: Sequelize.DATE
		}
	},
	{
	freezeTableName: true, // Model tableName will be the same as the model name
	paranoid: true
});

Schedule.belongsTo(Course, {foreignKey: 'Course_idCourse'}); // Ads Course_idCourse in Schedule
Schedule.belongsTo(Room, {foreignKey: 'Room_idRoom'}); // Ads Room_idRoom in Schedule

module.exports = Schedule;