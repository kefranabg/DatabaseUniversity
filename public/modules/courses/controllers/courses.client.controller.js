'use strict';

angular.module('courses').controller('CoursesController', ['$scope', '$http', '$mdDialog',
    function($scope, $http, $mdDialog) {
        $scope.courses = null;
        $scope.error = '';
        $scope.selected = [];
        $scope.error = '';
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

        $scope.$watch('query.search', function (newValue, oldValue) {
            if(!oldValue) {
                bookmark = $scope.query.page;
            }

            if(newValue !== oldValue) {
                $scope.query.page = 1;
            }

            if(!newValue) {
                $scope.query.page = bookmark;
            }
        });

        $scope.getCourses = function() {
            $http.get('/api/course').then(function (response) {
                $scope.courses = response.data;
            }, function (response) {
                $scope.error = response;
            });
        };

        $scope.updateCourse = function(course) {
            $http.put('/api/course/' + course.idCourse, course).then(function (response) {
                $scope.getCourses();
            }, function (response) {
                $scope.error = response;
            });
        }

        $scope.createCourse = function(course) {
            $http.post('/api/course', course).then(function (response) {
                $scope.getCourses();
            }, function (response) {
                console.log(response);
                $scope.error = response;
            });
        }

        $scope.deleteCourses = function() {
            for (var i = 0; i < $scope.selected.length; i++) {
                for (var count in $scope.courses) {
                    if ($scope.courses[count] === $scope.selected[i]) {
                        $scope.courses.splice(count, 1);
                    }
                }

                $http.delete('/api/course/' + $scope.selected[i].idCourse).then(function (response) {
                }, function (response) {
                    $scope.error = response;
                });

            }
            $scope.selected = [];
        }

        $scope.showEditCourse = function(ev, course) {
            $mdDialog.show({
                controller: EditCourse,
                templateUrl: 'modules/courses/views/edit-course.tmpl.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose:true,
                locals: { ancestScope: $scope, course: course }
            });
        };

        $scope.showCreateCourse = function(ev) {
            $mdDialog.show({
                controller: CreateCourse,
                templateUrl: 'modules/courses/views/edit-course.tmpl.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose:true,
                locals: { ancestScope: $scope }
            });
        };

        function CreateCourse($scope, $mdDialog, ancestScope) {
            $scope.course = {};

            $http.get('/api/professor').then(function (response) {
                $scope.professors = response.data;
            }, function (response) {
                $scope.error = response;
            });

            $scope.confirmSave = function() {
                ancestScope.createCourse($scope.course);
                $mdDialog.hide();
            };

            $scope.cancel = function() {
                $mdDialog.hide();
            };
        };

        function EditCourse($scope, $mdDialog, ancestScope, course) {
            var tmp = $.extend(true, {}, course);
            $scope.course = course;

            $http.get('/api/professor').then(function (response) {
                $scope.professors = response.data;
            }, function (response) {
                $scope.error = response;
            });

            $scope.confirmSave = function() {
                ancestScope.updateCourse(course);
                $mdDialog.hide();
            };

            $scope.cancel = function() {
                for (var prop in tmp)
                    course[prop] = tmp[prop];
                $mdDialog.hide();
            };
        };
    }
]);
