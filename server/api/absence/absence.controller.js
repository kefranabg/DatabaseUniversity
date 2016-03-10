'use strict';

var Absence = require('./absence.model');
var Professor = require('./../professor/professor.model');
var Student = require('./../student/student.model').Student;

var createAbsence = function(req, res, next) {
	console.log(req.body);
	Absence.create(req.body)
	.then(function(absence) {
		res.status(201).send(absence);
	});
};

var updateAbsence = function(req, res, next) {
	Absence.findById(req.params.id)
	.then(function(absence) {
		if (absence) {
			absence.update(req.body)
			.then(function() {
				res.sendStatus(204);
			});
		}
	});
};

var findAllAbsences = function(req, res, next) {
	Absence.findAll({include: [
       { model: Professor, attributes: ["firstName", "lastName", "degree"] },
       { model: Student, attributes: ["firstName", "lastName"] }
    ]}).then(function(absence) {
		res.status(200).json(absence);
	});
};

var findAbsenceById = function(req, res, next) {
	//Absence.findById(req.params.id)
    Absence.findOne({ where: {idAbsence: req.params.id}, include: [
        { model: Professor, attributes: ["fistname", "lastname"] },
        { model: Student, attributes: ["firstName", "lastname"] }
    ]}).then(function(absence) {
		res.status(200).json(absence);
	})
};

var deleteAbsenceById = function(req, res, next) {
	Absence.findById(req.params.id)
	.then(function(absence) {
		if (absence) {
			var s = absence;
			absence.destroy()
			.then(function() {
				res.status(202).json(s);
			})
		}
	});
}

module.exports = {
	createAbsence: createAbsence,
	findAllAbsences: findAllAbsences,
	findAbsenceById: findAbsenceById,
	deleteAbsenceById: deleteAbsenceById,
	updateAbsence: updateAbsence
};