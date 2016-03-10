'use strict';

angular.module('students').controller('StudentsController', ['$scope', '$http', '$mdDialog',
    function ($scope, $http, $mdDialog) {
        $scope.students = null;
        $scope.error = '';
        $scope.selected = [];
        $scope.error = '';
        $scope.courses = null;
        $scope.selectedCourse = null;
        var bookmark;

        $scope.query = {
            order: 'firstName',
            limit: 10,
            page: 1,
            search: '',
            predicate: '-firstName',
            reverse: true,
            rowPerPage: [10, 15, 20]
        };

        $scope.onReorder = function (order) {
            $scope.query.reverse = ($scope.query.predicate === order) ? !$scope.query.reverse : false;
            $scope.query.predicate = order;
        };

        $scope.$watch('selectedCourse', function (newValue, oldValue) {
            if ($scope.selectedCourse === null || $scope.selectedCourse === '')
                $scope.getStudents();
            else {
                $http.get('/api/course/' + $scope.selectedCourse + '/students').then(function (response) {
                    $scope.students = response.data;
                }, function (response) {
                    $scope.error = response;
                });
            }
        });

        $scope.getCourses = function () {
            $http.get('/api/course').then(function (response) {
                $scope.courses = response.data;
                $scope.courses.unshift({name: '', idCourse: ''});
            }, function (response) {
                $scope.error = response;
            });
        };

        $scope.$watch('query.search', function (newValue, oldValue) {
            if (!oldValue) {
                bookmark = $scope.query.page;
            }

            if (newValue !== oldValue) {
                $scope.query.page = 1;
            }

            if (!newValue) {
                $scope.query.page = bookmark;
            }
        });

        $scope.getStudents = function () {
            $http.get('/api/student').then(function (response) {
                $scope.students = response.data;
            }, function (response) {
                $scope.error = response;
            });
        };

        $scope.updateStudent = function (student) {
            $http.put('/api/student/' + student.idStudent, student).then(function (response) {
                $scope.getStudents();
            }, function (response) {
                $scope.error = response;
            });
        }

        $scope.createStudent = function (student) {
            $http.post('/api/student', student).then(function (response) {
                $scope.getStudents();
            }, function (response) {
                console.log(response);
                $scope.error = response;
            });
        }

        $scope.deleteStudents = function () {
            for (var i = 0; i < $scope.selected.length; i++) {
                for (var count in $scope.students) {
                    if ($scope.students[count] === $scope.selected[i]) {
                        $scope.students.splice(count, 1);
                    }
                }
                $http.delete('/api/student/' + $scope.selected[i].idStudent).then(function (response) {
                    $scope.getCourses();
                }, function (response) {

                    $scope.error = response;
                });

            }
            $scope.selected = [];
        }

        $scope.showEditStudent = function (ev, student) {
            $mdDialog.show({
                controller: EditStudent,
                templateUrl: 'modules/students/views/edit-student.tmpl.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true,
                locals: {ancestScope: $scope, student: student}
            });
        };

        $scope.showCreateStudent = function (ev) {
            $mdDialog.show({
                controller: CreateStudent,
                templateUrl: 'modules/students/views/edit-student.tmpl.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true,
                locals: {ancestScope: $scope}
            });
        };

        function CreateStudent($scope, $mdDialog, ancestScope) {
            $scope.student = {};

            $scope.confirmSave = function () {
                ancestScope.createStudent($scope.student);
                $mdDialog.hide();
            };

            $scope.cancel = function () {
                $mdDialog.hide();
            };
        };

        function EditStudent($scope, $mdDialog, ancestScope, student) {
            var tmp = $.extend(true, {}, student);
            $scope.student = student;
            $scope.selected = null;

            $http.get('/api/course').then(function (response) {
                $scope.allCourses = response.data;
            }, function (response) {
                $scope.error = response;
            });

            $http.get('/api/student/' + student.idStudent + '/course').then(function (response) {
                $scope.courses = response.data;

            }, function (response) {
                $scope.error = response;
            });

            $http.get('/api/student/' + student.idStudent + '/grades').then(function (response) {
                $scope.grades = response.data;
            }, function (response) {
                $scope.error = response;
            });

            $http.get('/api/student/' + student.idStudent + '/schedule').then(function (response) {
                $scope.schedule = response.data;
            }, function (response) {
                $scope.error = response;
            });

            $scope.addCourse = function(selected) {
                $http.post('/api/student/' + student.idStudent + '/course', selected).then(function (response) {
                    $http.get('/api/student/' + student.idStudent + '/course').then(function (response) {
                        $scope.courses = response.data;

                    }, function (response) {
                        $scope.error = response;
                    });

                }, function (response) {
                    $scope.error = response;
                });
            }

            $scope.confirmSave = function () {
                ancestScope.updateStudent(student);
                $mdDialog.hide();
            };

            $scope.cancel = function () {
                for (var prop in tmp)
                    student[prop] = tmp[prop];
                $mdDialog.hide();
            };
        };
    }
]);
