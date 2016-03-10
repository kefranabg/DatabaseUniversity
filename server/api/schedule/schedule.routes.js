'use strict';

var controller = require('./schedule.controller');

var express = require('express')
var router = express.Router();

router.post('/schedule', controller.createSchedule);
router.put('/schedule/:id', controller.updateSchedule);
router.get('/schedule', controller.findAllSchedules);
router.get('/schedule/:id', controller.findScheduleById);
router.delete('/schedule/:id', controller.deleteScheduleById);

module.exports = router;