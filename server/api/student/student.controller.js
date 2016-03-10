'use strict';

var Student = require('./student.model').Student;
var StudentToCourse = require('./student.model').StudentToCourse;
var Course = require('./../course/course.model');
var Grade = require('./../grade/grade.controller');
var Schedule = require('./../schedule/schedule.controller');

var createStudent = function(req, res, next) {
	Student.create(req.body)
	.then(function(student) {
		res.status(201).send(student);
	});
};

var updateStudent = function(req, res, next) {
	Student.findById(req.params.id)
	.then(function(student) {
		if (student) {
			student.update(req.body)
			.then(function() {
				res.sendStatus(204);
			});
		}
	});
};

var findAllStudents = function(req, res, next) {
	Student.findAll()
	.then(function(students) {
		res.status(200).json(students);
	});
};

var findStudentById = function(req, res, next) {
	Student.findById(req.params.id)
	.then(function(student) {
		res.status(200).json(student);
	});
};

var deleteStudentById = function(req, res, next) {
	Student.findById(req.params.id)
	.then(function(student) {
		if (student) {
			var s = student;
			student.destroy()
			.then(function() {
				res.status(202).json(s);
			})
		} else {
			res.sendStatus(400);
		}
	});
}

var addStudentToCourse = function(req, res, next) {
	Student.findById(req.params.id)
	.then(function(student) {
		if (student) {
			Course.findById(req.body.idCourse)
			.then(function(course) {
				if (course) {
					StudentToCourse.create({ Student_idStudent: student.get('idStudent'), Course_idCourse: course.get('idCourse') })
					.then(function(studentToCourse) {
						if (studentToCourse) {
							res.sendStatus(202);
						} else {
							res.sendStatus(400);
						}
					});
				} else {
					res.status(400).json('No course found for the id: ' + req.body.idCourse);
				}
			});
		} else {
			res.status(400).json('No student found for the id: ' + req.params.id);
		}
	});
};

var getAllCoursesByStudent = function(req, res, next) {
	Student.findById(req.params.id)
	.then(function(student) {
		if (student) {
			StudentToCourse.findAll({ where: { Student_idStudent: student.get('idStudent') }, include: [
     		{ model: Course, attributes: ['name', "type", "level"] }] })
			.then(function(courses) {
				if (courses) {
					res.status(200).json(courses);
				} else {
					res.status(400).json('No course found for the student id: ' + student.get('idStudent'));
				}
			})
		} else {
			res.status(400).json('No student found for the id: ' + req.params.id);
		}
	});
};

var deleteStudentToCourse = function(req, res, next) {
	Student.findById(req.params.id)
	.then(function(student) {
		if (student) {
			StudentToCourse.findAll({ where: { Student_idStudent: student.get('idStudent'), Course_idCourse: req.body.idCourse} })
			.then(function(course) {
				if (course) {
					var c = course;
					course.destroy()
					.then(function() {
						res.status(202).json(c);
					})
				} else {
					res.status(400).json('No course found for the id: ' + req.body.idCourse);
				}
			});
		} else {
			res.status(400).json('No student found for the id: ' + req.params.id);
		}
	});
};

var getStudentSchedule = function(req, res, next) {
	getStudentCoursesLoc(req.params.id, function(err, courses) {
		if (err) {
			res.status(400).json(err);
		} else {
			Schedule.findScheduleByStudent(courses, function(err, schedules) {
				if (err) {
					res.status(400).json(err);
				} else {
					res.status(200).json(schedules);
				}
			});
		}
	});
}

var getAllGradesByStudent = function(req, res, next) {
	Grade.getAllGradesByIdStudent(req.params.id, function(err, courses) {
		if (err) {
			res.status(400).json(err);
		} else {
			res.status(200).json(courses);
		}
	})
};

/*
 * Local functions
 */
var getStudentByIdLoc = function(studentId, callback) {
	Student.findById(studentId)
	.then(function(student) {
		callback(student);
	});
};

var getStudentCoursesLoc = function(studentId, callback) {
	Student.findById(studentId)
	.then(function(student) {
		if (student) {
			StudentToCourse.findAll({ where: { Student_idStudent: student.get('idStudent') }, include: [
     		{ model: Course, attributes: ['idCourse', 'name', "type", "level"] }] })
			.then(function(courses) {
				if (courses) {
					callback(null, courses);
				} else {
					callback('No course found for the student id: ' + student.get('idStudent'));
				}
			})
		} else {
			callback('No student found for the id: ' + studentId);
		}
	});
}

module.exports = {
	createStudent: createStudent,
	findAllStudents: findAllStudents,
	findStudentById: findStudentById,
	deleteStudentById: deleteStudentById,
	updateStudent: updateStudent,
	subscribeToCourse: addStudentToCourse,
	getAllCourses: getAllCoursesByStudent,
	deleteStudentToCourse: deleteStudentToCourse,
	getStudentByIdLoc: getStudentByIdLoc,
    getAllGradesByStudent: getAllGradesByStudent,
	getStudentSchedule: getStudentSchedule
};