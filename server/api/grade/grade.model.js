'use strict';

var sequelize = require('./../../config/config').sequelize;
var Sequelize = require('Sequelize');
var Quizz = require('./../quizz/quizz.model');
var Student = require('./../student/student.model');

var Grade = sequelize.define('Grade', {
		idGrade: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoiIncrement: true
		},
		score: {
			type: Sequelize.INTEGER
		},
	},
	{
	freezeTableName: true, // Model tableName will be the same as the model name
	paranoid: true
});

Grade.belongsTo(Quizz, {foreignKey: 'Quizz_idQuizz'});
Grade.belongsTo(Student.Student, {foreignKey: 'Student_idStudent'});

module.exports = Grade;