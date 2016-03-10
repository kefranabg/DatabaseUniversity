'use strict';

angular.module('quizzes').controller('QuizzesController', ['$scope', '$http', '$mdDialog',
    function($scope, $http, $mdDialog) {
        $scope.quizzes = null;
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

        $scope.getQuizzes = function() {
            $http.get('/api/quizz').then(function (response) {
                $scope.quizzes = response.data;
            }, function (response) {
                $scope.error = response;
            });
        };

        $scope.updateQuizz = function(quizz) {
            $http.put('/api/quizz/' + quizz.idQuizz, quizz).then(function (response) {
            }, function (response) {
                $scope.error = response;
            });
        }

        $scope.createQuizz = function(quizz) {
            $http.post('/api/quizz', quizz).then(function (response) {
                $scope.getQuizzes();
            }, function (response) {
                console.log(response);
                $scope.error = response;
            });
        }

        $scope.deleteQuizzes = function() {
            for (var i = 0; i < $scope.selected.length; i++) {
                for (var count in $scope.quizzes) {
                    if ($scope.quizzes[count] === $scope.selected[i]) {
                        $scope.quizzes.splice(count, 1);
                    }
                }
                $http.delete('/api/quizz/' + $scope.selected[i].idQuizz).then(function (response) {
                }, function (response) {
                    $scope.error = response;
                });

            }
            $scope.selected = [];
        }

        $scope.showEditQuizz = function(ev, quizz) {
            $mdDialog.show({
                controller: EditQuizz,
                templateUrl: 'modules/quizzes/views/edit-quizz.tmpl.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose:true,
                locals: { ancestScope: $scope, quizz: quizz }
            });
        };

        $scope.showCreateQuizz = function(ev) {
            $mdDialog.show({
                controller: CreateQuizz,
                templateUrl: 'modules/quizzes/views/edit-quizz.tmpl.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose:true,
                locals: { ancestScope: $scope }
            });
        };

        function CreateQuizz($scope, $mdDialog, ancestScope) {
            $scope.quizz = {};

            $http.get('/api/course').then(function (response) {
                $scope.courses = response.data;
            }, function (response) {
                $scope.error = response;
            });

            $scope.confirmSave = function() {
                ancestScope.createQuizz($scope.quizz);
                $mdDialog.hide();
            };

            $scope.cancel = function() {
                $mdDialog.hide();
            };
        };

        function EditQuizz($scope, $mdDialog, ancestScope, quizz) {
            var tmp = $.extend(true, {}, quizz);
            $scope.quizz = quizz;

            $http.get('/api/course').then(function (response) {
                $scope.courses = response.data;
            }, function (response) {
                $scope.error = response;
            });

            $scope.confirmSave = function() {
                ancestScope.updateQuizz(quizz);
                $mdDialog.hide();
            };

            $scope.cancel = function() {
                for (var prop in tmp)
                    quizz[prop] = tmp[prop];
                $mdDialog.hide();
            };
        };
    }
]);
