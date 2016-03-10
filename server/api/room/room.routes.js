'use strict';

var controller = require('./room.controller');

var express = require('express')
var router = express.Router();

router.post('/room', controller.createRoom);
router.put('/room/:id', controller.updateRoom);
router.get('/room', controller.findAllRooms);
router.get('/room/:id', controller.findRoomById);
router.delete('/room/:id', controller.deleteRoomById);

module.exports = router;