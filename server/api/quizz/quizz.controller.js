'use strict';

var Quizz = require('./quizz.model');

var createQuizz = function(req, res, next) {
	console.log(req.body);
	Quizz.create(req.body)
	.then(function(quizz) {
		res.status(201).send(quizz);
	});
};

var updateQuizz = function(req, res, next) {
	Quizz.findById(req.params.id)
	.then(function(quizz) {
		if (quizz) {
			quizz.update(req.body)
			.then(function() {
				res.sendStatus(204);
			});
		}
	});
};

var findAllQuizzs = function(req, res, next) {
	Quizz.findAll()
	.then(function(quizzs) {
		res.status(200).json(quizzs);
	});
};

var findQuizzById = function(req, res, next) {
	Quizz.findById(req.params.id)
	.then(function(quizz) {
		res.status(200).json(quizz);
	})
};

var deleteQuizzById = function(req, res, next) {
	Quizz.findById(req.params.id)
	.then(function(quizz) {
		if (quizz) {
			var s = quizz;
			quizz.destroy()
			.then(function() {
				res.status(202).json(s);
			})
		}
	});
};

var findQuizzBySchedule = function(schedules, callback) {
	var schedulesId = [];
	schedules.forEach(function(schedule) {
		schedulesId.push(schedule.idSchedule);
	});
	Quizz.findAll({ where: { Schedule_idSchedule: { $in: schedulesId } } })
	.then(function(quizzes) {
		if (quizzes) {
			callback(null, quizzes);
		} else {
			callback('No quizz found');
		}
	})
};

module.exports = {
	createQuizz: createQuizz,
	findAllQuizzs: findAllQuizzs,
	findQuizzById: findQuizzById,
	deleteQuizzById: deleteQuizzById,
	updateQuizz: updateQuizz,
	findQuizzBySchedule: findQuizzBySchedule
};