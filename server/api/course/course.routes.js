'use strict';

var controller = require('./course.controller');

var express = require('express')
var router = express.Router();

router.post('/course', controller.createCourse);
router.put('/course/:id', controller.updateCourse);
router.get('/course', controller.findAllCourses);
router.get('/course/:id', controller.findCourseById);
router.delete('/course/:id', controller.deleteCourseById);
router.get('/course/:id/students', controller.getAllStudentsByCourse);
router.get('/course/:id/quizz', controller.getAllQuizzByCourse);
router.get('/course/:id/schedule', controller.getAllSchedulesByCourse);

module.exports = router;