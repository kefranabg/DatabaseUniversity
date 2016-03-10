'use strict';

var controller = require('./student.controller');

var express = require('express')
var router = express.Router();

router.post('/student', controller.createStudent);
router.put('/student/:id', controller.updateStudent);
router.get('/student', controller.findAllStudents);
router.get('/student/:id', controller.findStudentById);
router.delete('/student/:id', controller.deleteStudentById);
router.post('/student/:id/course', controller.subscribeToCourse);
router.get('/student/:id/course', controller.getAllCourses);
router.delete('/student/:id/course', controller.deleteStudentToCourse);
router.get('/student/:id/grades', controller.getAllGradesByStudent);
router.get('/student/:id/schedule', controller.getStudentSchedule);

module.exports = router;