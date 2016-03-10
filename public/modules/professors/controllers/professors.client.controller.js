'use strict';

angular.module('professors').controller('ProfessorsController', ['$scope', '$http', '$mdDialog',
    function($scope, $http, $mdDialog) {
        $scope.professors = null;
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

        $scope.getProfessors = function() {
            $http.get('/api/professor').then(function (response) {
                $scope.professors = response.data;
            }, function (response) {
                $scope.error = response;
            });
        };

        $scope.updateProfessor = function(professor) {
            $http.put('/api/professor/' + professor.idProfessor, professor).then(function (response) {
                $scope.getProfessors();
            }, function (response) {
                $scope.error = response;
            });
        }

        $scope.createProfessor = function(professor) {
            $http.post('/api/professor', professor).then(function (response) {
                $scope.getProfessors();
            }, function (response) {
                console.log(response);
                $scope.error = response;
            });
        }

        $scope.deleteProfessors = function() {
            for (var i = 0; i < $scope.selected.length; i++) {
                for (var count in $scope.professors) {
                    if ($scope.professors[count] === $scope.selected[i]) {
                        $scope.professors.splice(count, 1);
                    }
                }
                $http.delete('/api/professor/' + $scope.selected[i].professorId).then(function (response) {
                }, function (response) {
                    $scope.error = response;
                });

            }
            $scope.selected = [];
        }

        $scope.showEditProfessor = function(ev, professor) {
            $mdDialog.show({
                controller: EditProfessor,
                templateUrl: 'modules/professors/views/edit-professor.tmpl.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose:true,
                locals: { ancestScope: $scope, professor: professor }
            });
        };

        $scope.showCreateProfessor = function(ev) {
            $mdDialog.show({
                controller: CreateProfessor,
                templateUrl: 'modules/professors/views/edit-professor.tmpl.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose:true,
                locals: { ancestScope: $scope }
            });
        };

        function CreateProfessor($scope, $mdDialog, ancestScope) {
            $scope.professor = {};

            $scope.confirmSave = function() {
                ancestScope.createProfessor($scope.professor);
                $mdDialog.hide();
            };

            $scope.cancel = function() {
                $mdDialog.hide();
            };
        };

        function EditProfessor($scope, $mdDialog, ancestScope, professor) {
            var tmp = $.extend(true, {}, professor);
            $scope.professor = professor;

            $scope.confirmSave = function() {
                ancestScope.updateProfessor(professor);
                $mdDialog.hide();
            };

            $scope.cancel = function() {
                for (var prop in tmp)
                    professor[prop] = tmp[prop];
                $mdDialog.hide();
            };
        };
    }
]);
