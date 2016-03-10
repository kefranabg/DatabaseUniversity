'use strict';

var sequelize = require('./../../config/config').sequelize;

var Video = require('./video.model');

var addNewVideoElapsed = function(req, res, next) {
	console.log('body received: ' + JSON.stringify(req.body));
	Video.create(req.body)
	.then(function(video) {
		res.status(201).send(video);
	});
};

var getAVG = function(callback) {
	sequelize.query("SELECT AVG(elapsedTime) AS AVG FROM `Video`", { type: sequelize.QueryTypes.SELECT })
	.then(function(avg) {
		if (avg) {
			callback(null, avg[0].AVG);
		} else {
			callback('No video watched');
		}
	});
};

var getAVGVideo = function(req, res, next) {
	getAVG(function(err, avg) {
		if (err) {
			res.status(400).json(err);
		} else {
			res.status(200).json({ Average: avg });
		}
	});
};

var getVideoCompletedViews = function(callback) {
	sequelize.query("SELECT COUNT(*) AS COMPLETED FROM `Video` WHERE completedViews = TRUE", { type: sequelize.QueryTypes.SELECT })
	.then(function(views) {
		if (views) {
			callback(null, views[0].COMPLETED);
		} else {
			callback('No video completed');
		}
	});
};

var getVideoCompleted = function(req, res, next) {
	getVideoCompletedViews(function(err, completedViews) {
		if (err) {
			res.status(400).json(err);
		} else {
			res.status(200).json({ completed: completedViews });
		}
	});
};

module.exports = {
	addNewVideoElapsed: addNewVideoElapsed,
	getAVGVideo: getAVGVideo,
	getVideoCompleted: getVideoCompleted
};