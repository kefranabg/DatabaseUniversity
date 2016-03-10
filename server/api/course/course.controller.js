'use strict';

var async = require('async');

var Course = require('./course.model');
var StudentToCourse = require('./../student/student.model').StudentToCourse;
var Student = require('./../student/student.controller');
var Professor = require('./../professor/professor.model');
var Schedule = require('./../schedule/schedule.controller');
var Quizz = require('./../quizz/quizz.controller');

var createCourse = function(req, res, next) {
	Course.create(req.body)
	.then(function(course) {
		res.status(201).send(course);
	});
};

var updateCourse = function(req, res, next) {
	Course.findById(req.params.id)
	.then(function(course) {
		if (course) {
			course.update(req.body)
			.then(function() {
				res.sendStatus(204);
			});
		}
	});
};

var findAllCourses = function(req, res, next) {
	Course.findAll({include: [
     { model: Professor, attributes: ['firstName', "lastName", "degree"] }]})
	.then(function(courses) {
		res.status(200).json(courses);
	});
};

var findCourseById = function(req, res, next) {
	Course.findOne({ where: {idCourse: req.params.id}, include: [
     { model: Professor, attributes: ['firstName', "lastName", "degree"] }]})
	.then(function(course) {
		res.status(200).json(course);
	})
};

var deleteCourseById = function(req, res, next) {
	Course.findById(req.params.id)
	.then(function(course) {
		if (course) {
			var s = course;
			course.destroy()
			.then(function() {
				res.status(202).json(s);
			})
		}
	});
};

var getAllStudentsByCourse = function(req, res, next) {
	StudentToCourse.findAll({ where: { Course_idCourse: req.params.id } })
	.then(function(students) {
		var response = [];
		if (students) {
			async.each(students, function(student, callback) {
				Student.getStudentByIdLoc(student.get('Student_idStudent'), function(student) {
					if (student) {
						response.push(student);
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
			res.status(400).json('No student registered for the course id: ' + req.params.id);
		}
	});
};

var getAllCoursesByProfessorId = function(professorId, callback) {
	Course.findAll({ attributes: ['name', 'level', 'type'], where: {Professor_professorId: professorId} })
	.then(function(courses) {
		if (courses) {
			callback(null, courses);
		} else {
			callback('The professor with id:' + professorId + ' is not registered of any courses');
		}
	})
};

var getAllQuizzByCourse = function(req, res, next) {
	Schedule.getScheduleByCourse(req.params.id, function(err, schedules) {
		if (err) {
			res.status(400).json(err);
		} else {
			Quizz.findQuizzBySchedule(schedules, function(err, quizzes) {
				if (err) {
					res.status(400).json(err);
				} else {
					res.status(200).json(quizzes);
				}
			});
		}
	});
};

var getAllSchedulesByCourse = function(req, res, next) {
    Schedule.getScheduleByCourse(req.params.id, function(err, schedules) {
        if (err) {
            res.status(400).json(err);
        } else {
            res.status(200).json(schedules);
        }
    })
};

module.exports = {
	createCourse: createCourse,
	findAllCourses: findAllCourses,
	findCourseById: findCourseById,
	deleteCourseById: deleteCourseById,
	updateCourse: updateCourse,
	getAllStudentsByCourse: getAllStudentsByCourse,
	getAllCoursesByProfessorId: getAllCoursesByProfessorId,
	getAllQuizzByCourse: getAllQuizzByCourse,
    getAllSchedulesByCourse: getAllSchedulesByCourse
};