'use strict';

var controller = require('./professor.controller');

var express = require('express')
var router = express.Router();

router.post('/professor', controller.createProfessor);
router.put('/professor/:id', controller.updateProfessor);
router.get('/professor', controller.findAllProfessors);
router.get('/professor/:id', controller.findProfessorById);
router.delete('/professor/:id', controller.deleteProfessorById);
router.get('/professor/:id/courses', controller.getAllCoursesByProfessor);

module.exports = router;