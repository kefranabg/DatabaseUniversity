'use strict';

var sequelize = require('./../../config/config').sequelize;
var Sequelize = require('Sequelize');
var Schedule = require('./../schedule/schedule.model');

var Assignement = sequelize.define('Assignement', {
		idAssignement: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoiIncrement: true
		},
		dueTo: {
			type: Sequelize.DATE
		},
        topic: {
            type: Sequelize.STRING
        },
        name: {
            type: Sequelize.STRING
        }
	},
	{
	freezeTableName: true, // Model tableName will be the same as the model name
	paranoid: true
});

Assignement.belongsTo(Schedule, {foreignKey: 'Schedule_idSchedule'});

module.exports = Assignement;