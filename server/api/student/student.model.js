'use strict';

var sequelize = require('./../../config/config').sequelize;
var Sequelize = require('Sequelize');
var Course = require('./../course/course.model');

// Check db authentication
sequelize.authenticate().then(function(errors) { console.log(errors) });

/*
 * Student model
 */
var Student = sequelize.define('Student', {
		idStudent: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoiIncrement: true
		},
		firstName: {
			type: Sequelize.STRING
		},
		lastName: {
			type: Sequelize.STRING
		},
		zipCode: {
			type: Sequelize.INTEGER
		},
		streetAddress: {
			type: Sequelize.STRING
		},
		phoneNumber: {
			type: Sequelize.STRING
		},
		country: {
			type: Sequelize.STRING
		},
		email: {
			type: Sequelize.STRING
		},
		city: {
			type: Sequelize.STRING
		},
		major: {
			type: Sequelize.STRING
		}
	},
	{
	freezeTableName: true, // Model tableName will be the same as the model name
	paranoid: true
});

/*
 * Student to course model
 */
var StudentToCourse = sequelize.define('courseToStudent', {
		Student_idStudent: {
			type: Sequelize.INTEGER,
			primaryKey: true
		}
	},
	{
	freezeTableName: true, // Model tableName will be the same as the model name
	timestamps: false
});

StudentToCourse.belongsTo(Course, {foreignKey: 'Course_idCourse'}); // Ads Course_idCourse in Course
StudentToCourse.belongsTo(Student, {foreignKey: 'Student_idStudent'}); // Ads Student_idStudent in Course


module.exports = {
	Student: Student,
	StudentToCourse: StudentToCourse
};