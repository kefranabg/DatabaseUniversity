'use strict';

var Assignement = require('./assignement.model');

var createAssignement = function(req, res, next) {
	console.log(req.body);
	Assignement.create(req.body)
	.then(function(assignement) {
		res.status(201).send(assignement);
	});
};

var updateAssignement = function(req, res, next) {
	Assignement.findById(req.params.id)
	.then(function(assignement) {
		if (assignement) {
			assignement.update(req.body)
			.then(function() {
				res.sendStatus(204);
			});
		}
	});
};

var findAllAssignements = function(req, res, next) {
	Assignement.findAll()
	.then(function(assignement) {
		res.status(200).json(assignement);
	});
};

var findAssignementById = function(req, res, next) {
	Assignement.findById(req.params.id)
	.then(function(assignement) {
		res.status(200).json(assignement);
	})
};

var deleteAssignementById = function(req, res, next) {
	Assignement.findById(req.params.id)
	.then(function(assignement) {
		if (assignement) {
			var s = assignement;
			assignement.destroy()
			.then(function() {
				res.status(202).json(s);
			})
		}
	});
}

module.exports = {
	createAssignement: createAssignement,
	findAllAssignements: findAllAssignements,
	findAssignementById: findAssignementById,
	deleteAssignementById: deleteAssignementById,
	updateAssignement: updateAssignement
};