'use strict';

var sequelize = require('./../../config/config').sequelize;
var Sequelize = require('Sequelize');

var Building = sequelize.define('Building', {
		idBuilding: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoiIncrement: true
		},
        name: {
            type: Sequelize.STRING
        },
		latitude: {
			type: Sequelize.STRING
		},
		longitude: {
			type: Sequelize.INTEGER
		}
	},
	{
	freezeTableName: true, // Model tableName will be the same as the model name
	paranoid: true
});

module.exports = Building;