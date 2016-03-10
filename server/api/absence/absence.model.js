'use strict';

var sequelize = require('./../../config/config').sequelize;
var Sequelize = require('Sequelize');
var Professor = require('./../professor/professor.model');
var Student = require('./../student/student.model');

var Absence = sequelize.define('Absence', {
		idAbsence: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoiIncrement: true
		},
		absDate: {
			type: Sequelize.DATE
		},
	},
	{
	freezeTableName: true, // Model tableName will be the same as the model name
	paranoid: true
});

Absence.belongsTo(Professor, {foreignKey: 'Professor_professorId'});
Absence.belongsTo(Student.Student, {foreignKey: 'Student_idStudent'});

module.exports = Absence;