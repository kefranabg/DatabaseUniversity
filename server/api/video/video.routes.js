'use strict';

var controller = require('./video.controller');

var express = require('express')
var router = express.Router();

router.post('/video', controller.addNewVideoElapsed);
router.get('/video', controller.getAVGVideo);
router.get('/video/completed', controller.getVideoCompleted);

module.exports = router;