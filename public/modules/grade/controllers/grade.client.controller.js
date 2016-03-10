'use strict';

angular.module('grade').controller('GradeController', ['$scope', '$http', '$mdDialog',
    function($scope, $http, $mdDialog) {
        $scope.grade = null;
        $scope.error = '';
        $scope.selected = [];
        $scope.error = '';
        var bookmark;

        $scope.query = {
            order: 'Quizz_idQuizz',
            limit: 10,
            page: 1,
            search: '',
            predicate: '-Quizz_idQuizz',
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

        $scope.getGrade = function() {
           $http.get('/api/grade').then(function (response) {
                $scope.grade = response.data;
            }, function (response) {
                $scope.error = response;
            });
        };

        $scope.updateGrade = function(grade) {
            $http.put('/api/grade/' + grade.idGrade, grade).then(function (response) {
                $scope.getGrade();
            }, function (response) {
                $scope.error = response;
            });
        }

        $scope.createGrade = function(grade) {
            $http.post('/api/grade', grade).then(function (response) {
                $scope.getGrade();
            }, function (response) {
                console.log(response);
                $scope.error = response;
            });
        }

        $scope.deleteGrade = function() {
            for (var i = 0; i < $scope.selected.length; i++) {
                for (var count in $scope.grade) {
                    if ($scope.grade[count] === $scope.selected[i]) {
                        $scope.grade.splice(count, 1);
                    }
                }

                $http.delete('/api/grade/' + $scope.selected[i].idGrade).then(function (response) {
                }, function (response) {
                    $scope.error = response;
                });

            }
            $scope.selected = [];
        }

        $scope.showEditGrade = function(ev, grade) {
            $mdDialog.show({
                controller: EditGrade,
                templateUrl: 'modules/grade/views/edit-grade.tmpl.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose:true,
                locals: { ancestScope: $scope, grade: grade }
            });
        };

        $scope.showCreateGrade = function(ev) {
            $mdDialog.show({
                controller: CreateGrade,
                templateUrl: 'modules/grade/views/edit-grade.tmpl.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose:true,
                locals: { ancestScope: $scope }
            });
        };

        function CreateGrade($scope, $mdDialog, ancestScope) {
            $scope.grade = {};
            $scope.selectedCourse = null;

            $http.get('/api/course').then(function (response) {
                $scope.courses = response.data;

            }, function (response) {
                $scope.error = response;
            });

            $scope.$watch('selectedCourse', function (newValue, oldValue) {
                if ($scope.selectedCourse != null) {
                    $http.get('/api/course/' + $scope.selectedCourse + '/quizz').then(function (response) {
                        $scope.quizzes = response.data;

                    }, function (response) {
                        $scope.error = response;
                    });
                }
            });

            $scope.confirmSave = function() {
                ancestScope.createGrade($scope.grade);
                $mdDialog.hide();
            };

            $scope.cancel = function() {
                $mdDialog.hide();
            };
        };

        function EditGrade($scope, $mdDialog, ancestScope, grade) {
            var tmp = $.extend(true, {}, grade);
            $scope.grade = grade;

            console.log(grade);
            $scope.selectedCourse = grade.Schedule[0].Course_idCourse;

            $http.get('/api/course').then(function (response) {
                $scope.courses = response.data;

            }, function (response) {
                $scope.error = response;
            });

            $scope.$watch('selectedCourse', function (newValue, oldValue) {
                if ($scope.selectedCourse != null) {
                    $http.get('/api/course/' + $scope.selectedCourse + '/quizz').then(function (response) {
                        $scope.quizzes = response.data;

                    }, function (response) {
                        $scope.error = response;
                    });
                }
            });

            $scope.confirmSave = function() {
                ancestScope.updateGrade(grade);
                $mdDialog.hide();
            };

            $scope.cancel = function() {
                for (var prop in tmp)
                    grade[prop] = tmp[prop];
                $mdDialog.hide();
            };
        };
    }
]);
