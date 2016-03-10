'use strict';

var controller = require('./absence.controller');

var express = require('express')
var router = express.Router();

router.post('/absence', controller.createAbsence);
router.put('/absence/:id', controller.updateAbsence);
router.get('/absence', controller.findAllAbsences);
router.get('/absence/:id', controller.findAbsenceById);
router.delete('/absence/:id', controller.deleteAbsenceById);

module.exports = router;