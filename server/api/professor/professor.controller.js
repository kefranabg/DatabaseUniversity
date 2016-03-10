'use strict';

var Professor = require('./professor.model');
var Course = require('./../course/course.controller');

var createProfessor = function(req, res, next) {
	console.log(req.body);
	Professor.create(req.body)
	.then(function(professor) {
		res.status(201).send(professor);
	});
};

var updateProfessor = function(req, res, next) {
	Professor.findById(req.params.id)
	.then(function(professor) {
		if (professor) {
			professor.update(req.body)
			.then(function() {
				res.sendStatus(204);
			});
		}
	});
};

var findAllProfessors = function(req, res, next) {
	Professor.findAll()
	.then(function(professors) {
		res.status(200).json(professors);
	});
};

var findProfessorById = function(req, res, next) {
	Professor.findById(req.params.id)
	.then(function(professor) {
		res.status(200).json(professor);
	})
};

var deleteProfessorById = function(req, res, next) {
	Professor.findById(req.params.id)
	.then(function(professor) {
		if (professor) {
			var s = professor;
			professor.destroy()
			.then(function() {
				res.status(202).json(s);
			})
		}
	});
}

var getAllCoursesByProfessor = function(req, res, next) {
	Course.getAllCoursesByProfessorId(req.params.id, function(err, courses) {
		if (err) {
			res.status(400).json(err);
		} else {
			res.status(200).json(courses);
		}
	})
};

module.exports = {
	createProfessor: createProfessor,
	findAllProfessors: findAllProfessors,
	findProfessorById: findProfessorById,
	deleteProfessorById: deleteProfessorById,
	updateProfessor: updateProfessor,
	getAllCoursesByProfessor: getAllCoursesByProfessor
};