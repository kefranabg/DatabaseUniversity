'use strict';

var Schedule = require('./schedule.model');
var Course = require('./../course/course.model');
var Room = require('./../room/room.model');

var createSchedule = function(req, res, next) {
	console.log(req.body);
	Schedule.create(req.body)
	.then(function(schedule) {
		res.status(201).send(schedule);
	});
};

var updateSchedule = function(req, res, next) {
	Schedule.findById(req.params.id)
	.then(function(schedule) {
		if (schedule) {
			schedule.update(req.body)
			.then(function() {
				res.sendStatus(204);
			});
		}
	});
};

var findAllSchedules = function(req, res, next) {
	Schedule.findAll()
	.then(function(schedules) {
		res.status(200).json(schedules);
	});
};

var findScheduleById = function(req, res, next) {
	Schedule.findById(req.params.id)
	.then(function(schedule) {
		res.status(200).json(schedule);
	})
};

var deleteScheduleById = function(req, res, next) {
	Schedule.findById(req.params.id)
	.then(function(schedule) {
		if (schedule) {
			var s = schedule;
			schedule.destroy()
			.then(function() {
				res.status(202).json(s);
			})
		}
	});
}

var findScheduleByStudent = function(courses, callback) {
	var coursesId = [];
	courses.forEach(function(course) {
		coursesId.push(course.Course.idCourse);
	});
	Schedule.findAll({ where: { Course_idCourse: { $in: coursesId } }, include: [
     { model: Room, attributes: ['number'] }, { model: Course, attributes: ['name', 'type', 'level'] }]})
	.then(function(schedules) {
		if (schedules) {
			callback(null, schedules);			
		} else {
			callback();
		}
	});
};

var getScheduleByCourse = function(courseId, callback) {
	Schedule.findAll({ where: { Course_idCourse: courseId } })
	.then(function(schedules) {
		if (schedules) {
			callback(null, schedules);
		} else {
			callback('No schedule found for the course with id: ' + courseId);
		}
	});
};

var getScheduleByQuizzId = function(quizzId, callback) {
	Schedule.findAll({ where: { idSchedule: quizzId }, include: { model: Course,  attributes: ['name', 'type', 'level'] } })
	.then(function(schedules) {
		if (schedules) {
			callback(null, schedules);
		} else {
			callback('No schedule found for the quizz with id: ' + quizzId);
		}
	});
};

module.exports = {
	createSchedule: createSchedule,
	findAllSchedules: findAllSchedules,
	findScheduleById: findScheduleById,
	deleteScheduleById: deleteScheduleById,
	updateSchedule: updateSchedule,
	findScheduleByStudent: findScheduleByStudent,
	getScheduleByCourse: getScheduleByCourse,
	getScheduleByQuizzId: getScheduleByQuizzId
};