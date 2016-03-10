'use strict';

var controller = require('./assignement.controller');

var express = require('express')
var router = express.Router();

router.post('/assignement', controller.createAssignement);
router.put('/assignement/:id', controller.updateAssignement);
router.get('/assignement', controller.findAllAssignements);
router.get('/assignement/:id', controller.findAssignementById);
router.delete('/assignement/:id', controller.deleteAssignementById);

module.exports = router;