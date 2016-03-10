'use strict';

var controller = require('./grade.controller');

var express = require('express')
var router = express.Router();

router.post('/grade', controller.createGrade);
router.put('/grade/:id', controller.updateGrade);
router.get('/grade', controller.findAllGrades);
router.get('/grade/:id', controller.findGradeById);
router.delete('/grade/:id', controller.deleteGradeById);

module.exports = router;