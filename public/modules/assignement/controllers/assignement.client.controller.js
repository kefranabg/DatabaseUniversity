'use strict';

angular.module('assignement').controller('AssignementController', ['$scope', '$http', '$mdDialog',
    function($scope, $http, $mdDialog) {
        $scope.assignement = null;
        $scope.error = '';
        $scope.selected = [];
        $scope.error = '';
        var bookmark;

        $scope.query = {
            order: 'dueTo',
            limit: 10,
            page: 1,
            search: '',
            predicate: '-dueTo',
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

        $scope.getAssignement = function() {
            $http.get('/api/assignement').then(function (response) {
                $scope.assignement = response.data;
                $scope.assignement.forEach(function(data) {
                    data.dueTo = new Date(data.dueTo);
                });

            }, function (response) {
                $scope.error = response;
            });
        };

        $scope.updateAssignement = function(assignement) {
            $http.put('/api/assignement/' + assignement.idAssignement, assignement).then(function (response) {
                $scope.getAssignement();
            }, function (response) {
                $scope.error = response;
            });
        }

        $scope.createAssignement = function(assignement) {
            $http.post('/api/assignement', assignement).then(function (response) {
                $scope.getAssignement();
            }, function (response) {
                console.log(response);
                $scope.error = response;
            });
        }

        $scope.deleteAssignement = function() {
            for (var i = 0; i < $scope.selected.length; i++) {
                for (var count in $scope.assignement) {
                    if ($scope.assignement[count] === $scope.selected[i]) {
                        $scope.assignement.splice(count, 1);
                    }
                }

                $http.delete('/api/assignement/' + $scope.selected[i].idAssignement).then(function (response) {
                }, function (response) {
                    $scope.error = response;
                });

            }
            $scope.selected = [];
        }

        $scope.showEditAssignement = function(ev, assignement) {
            $mdDialog.show({
                controller: EditAssignement,
                templateUrl: 'modules/assignement/views/edit-assignement.tmpl.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose:true,
                locals: { ancestScope: $scope, assignement: assignement }
            });
        };

        $scope.showCreateAssignement = function(ev) {
            $mdDialog.show({
                controller: CreateAssignement,
                templateUrl: 'modules/assignement/views/edit-assignement.tmpl.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose:true,
                locals: { ancestScope: $scope }
            });
        };

        function CreateAssignement($scope, $mdDialog, ancestScope) {
            $scope.assignement = {};

            $scope.confirmSave = function() {
                ancestScope.createAssignement($scope.assignement);
                $mdDialog.hide();
            };

            $scope.cancel = function() {
                $mdDialog.hide();
            };
        };

        function EditAssignement($scope, $mdDialog, ancestScope, assignement) {
            var tmp = $.extend(true, {}, assignement);
            $scope.assignement = assignement;

            $scope.confirmSave = function() {
                ancestScope.updateAssignement(assignement);
                $mdDialog.hide();
            };

            $scope.cancel = function() {
                for (var prop in tmp)
                    assignement[prop] = tmp[prop];
                $mdDialog.hide();
            };
        };
    }
]);
