'use strict';

var sequelize = require('./../../config/config').sequelize;
var Sequelize = require('Sequelize');
var Building = require('./../building/building.model');

var Room = sequelize.define('Room', {
		idRoom: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoiIncrement: true
		},
		number: {
			type: Sequelize.INTEGER
		},
		availableSeats: {
			type: Sequelize.INTEGER
		}
	},
	{
	freezeTableName: true, // Model tableName will be the same as the model name
	paranoid: true
});

Room.belongsTo(Building, {foreignKey: 'Building_IdBuilding'}); // Ads Building_IdBuilding in Room

module.exports = Room;