'use strict';

var Building = require('./building.model');

var createBuilding = function(req, res, next) {
	console.log(req.body);
	Building.create(req.body)
	.then(function(building) {
		res.status(201).send(building);
	});
};

var updateBuilding = function(req, res, next) {
	Building.findById(req.params.id)
	.then(function(building) {
		if (building) {
			building.update(req.body)
			.then(function() {
				res.sendStatus(204);
			});
		}
	});
};

var findAllBuildings = function(req, res, next) {
	Building.findAll()
	.then(function(buildings) {
		res.status(200).json(buildings);
	});
};

var findBuildingById = function(req, res, next) {
	Building.findById(req.params.id)
	.then(function(building) {
		res.status(200).json(building);
	})
};

var deleteBuildingById = function(req, res, next) {
	Building.findById(req.params.id)
	.then(function(building) {
		if (building) {
			var s = building;
			building.destroy()
			.then(function() {
				res.status(202).json(s);
			})
		}
	});
}

module.exports = {
	createBuilding: createBuilding,
	findAllBuildings: findAllBuildings,
	findBuildingById: findBuildingById,
	deleteBuildingById: deleteBuildingById,
	updateBuilding: updateBuilding
};