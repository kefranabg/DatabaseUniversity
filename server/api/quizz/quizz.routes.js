'use strict';

var controller = require('./quizz.controller');

var express = require('express')
var router = express.Router();

router.post('/quizz', controller.createQuizz);
router.put('/quizz/:id', controller.updateQuizz);
router.get('/quizz', controller.findAllQuizzs);
router.get('/quizz/:id', controller.findQuizzById);
router.delete('/quizz/:id', controller.deleteQuizzById);

module.exports = router;