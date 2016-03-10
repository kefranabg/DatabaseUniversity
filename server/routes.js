'use strict';

var express = require('express');
var router = express.Router();

module.exports = function(app) {
	app.use('/api', require('./api/student/student.routes'));
	app.use('/api', require('./api/professor/professor.routes'));
	app.use('/api', require('./api/course/course.routes'));
	app.use('/api', require('./api/building/building.routes'));
	app.use('/api', require('./api/room/room.routes'));
	app.use('/api', require('./api/schedule/schedule.routes'));
	app.use('/api', require('./api/quizz/quizz.routes'));
    app.use('/api', require('./api/absence/absence.routes'));
    app.use('/api', require('./api/grade/grade.routes'));
    app.use('/api', require('./api/assignement/assignement.routes'));
    app.use('/api', require('./api/video/video.routes'));
}