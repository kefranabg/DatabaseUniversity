'use strict';

var Room = require('./room.model');
var Building = require('./../building/building.model');

var createRoom = function(req, res, next) {
	Room.create(req.body)
	.then(function(room) {
		res.status(201).send(room);
	});
};

var updateRoom = function(req, res, next) {
	Room.findById(req.params.id)
	.then(function(room) {
		if (room) {
			room.update(req.body)
			.then(function() {
				res.sendStatus(204);
			});
		}
	});
};

var findAllRooms = function(req, res, next) {
	Room.findAll({ include: { model: Building, attributes: ['name'] } })
	.then(function(rooms) {
		res.status(200).json(rooms);
	});
};

var findRoomById = function(req, res, next) {
	Room.findOne({ where: { idRoom: req.params.id }, include: { model: Building, attributes: ['name'] } })
	.then(function(room) {
		res.status(200).json(room);
	})
};

var deleteRoomById = function(req, res, next) {
	Room.findById(req.params.id)
	.then(function(room) {
		if (room) {
			var s = room;
			room.destroy()
			.then(function() {
				res.status(202).json(s);
			})
		}
	});
}

module.exports = {
	createRoom: createRoom,
	findAllRooms: findAllRooms,
	findRoomById: findRoomById,
	deleteRoomById: deleteRoomById,
	updateRoom: updateRoom
};