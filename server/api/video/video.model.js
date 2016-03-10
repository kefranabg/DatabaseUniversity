'use strict';

var sequelize = require('./../../config/config').sequelize;
var Sequelize = require('Sequelize');

var Video = sequelize.define('Video', {
		idVideo: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoiIncrement: true
		},
		elapsedTime: {
			type: Sequelize.INTEGER
		},
		completedViews: {
			type: Sequelize.BOOLEAN
		}
	},
	{
	freezeTableName: true, // Model tableName will be the same as the model name
	timestamps: false
});

module.exports = Video;