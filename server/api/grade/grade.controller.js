'use strict';

var async = require('async');

var Grade = require('./grade.model');
var Quizz = require('./../quizz/quizz.model');
var Schedule = require('./../schedule/schedule.controller');

var createGrade = function(req, res, next) {
	Grade.create(req.body)
	.then(function(grade) {
		res.status(201).send(grade);
	});
};

var updateGrade = function(req, res, next) {
	Grade.findById(req.params.id)
	.then(function(grade) {
		if (grade) {
			grade.update(req.body)
			.then(function() {
				res.sendStatus(204);
			});
		}
	});
};

var findAllGrades = function(req, res, next) {
    Grade.findAll({include: [
     { model: Quizz, attributes: ['name', "topic"] }],
     	order: [
    	['createdAt', 'DESC'],
    	],
 		limit: 20 }).then(function(grades) {
		if (grades) {
			var response = [];
			async.each(grades, function(grade, callback) {
				Schedule.getScheduleByQuizzId(grade.Quizz_idQuizz, function(err, schedule) {
					grade = JSON.parse(JSON.stringify(grade));
					grade.Schedule = schedule;
					if (err) {
						callback(err);
					} else {
						response.push(grade);
						callback();
					}
				});
			},
			function(err) {
				if (err) {
					res.sendStatus(400);
				} else {
					res.status(200).json(response);
				}
			});
		} else {
			res.sendStatus(400);
		}
	});
};

var findGradeById = function(req, res, next) {
    Grade.findOne({ where: {idGrade: req.params.id}, include: [
     { model: Quizz, attributes: ['name', "topic"] }]})
	.then(function(grade) {
		if (grade) {
			Schedule.getScheduleByQuizzId(grade.Quizz_idQuizz, function(err, schedule) {
				grade = JSON.parse(JSON.stringify(grade));
				grade.Schedule = schedule;
				if (err) {
					res.status(400).json(err);
				} else {
					res.status(200).json(grade);
				}
			});
		} else {
			res.sendStatus(400);
		}
	});
};

var deleteGradeById = function(req, res, next) {
	Grade.findById(req.params.id)
	.then(function(grade) {
		if (grade) {
			var s = grade;
			grade.destroy()
			.then(function() {
				res.status(202).json(s);
			})
		}
	});
}

var getAllGradesByIdStudent = function(idStudent, callback) {
	Grade.findAll({ attributes: ['score'], where: {Student_idStudent: idStudent}, include: { model: Quizz, attributes: ['name', 'topic'] } })
	.then(function(grade) {
		if (grade) {
			callback(null, grade);
		} else {
			callback('The student with id:' + idStudent + 'doesn\'t have any grades.');
		}
	})
};

module.exports = {
	createGrade: createGrade,
	findAllGrades: findAllGrades,
	findGradeById: findGradeById,
	deleteGradeById: deleteGradeById,
	updateGrade: updateGrade,
    getAllGradesByIdStudent: getAllGradesByIdStudent
};