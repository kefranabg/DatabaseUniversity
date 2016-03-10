'use strict';

angular.module('absence').controller('AbsenceController', ['$scope', '$http', '$mdDialog',
    function($scope, $http, $mdDialog) {
        $scope.absence = null;
        $scope.error = '';
        $scope.selected = [];
        $scope.error = '';
        var bookmark;

        $scope.query = {
            order: 'absDate',
            limit: 10,
            page: 1,
            search: '',
            predicate: '-absDate',
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

        $scope.getAbsence = function() {
            $http.get('/api/absence').then(function (response) {
                $scope.absence = response.data;
                $scope.absence.forEach(function(data) {
                    data.absDate = new Date(data.absDate);
                });
            }, function (response) {
                $scope.error = response;
            });
        };

        $scope.updateAbsence = function(absence) {
            $http.put('/api/absence/' + absence.idAbsence, absence).then(function (response) {
            }, function (response) {
                $scope.error = response;
            });
        }

        $scope.createAbsence = function(absence) {
            $http.post('/api/absence', absence).then(function (response) {
                //$scope.absence.push(absence);
                $scope.getAbsence();
            }, function (response) {
                console.log(response);
                $scope.error = response;
            });
        }

        $scope.deleteAbsence = function() {
            for (var i = 0; i < $scope.selected.length; i++) {
                for (var count in $scope.absence) {
                    if ($scope.absence[count] === $scope.selected[i]) {
                        $scope.absence.splice(count, 1);
                    }
                }

                $http.delete('/api/absence/' + $scope.selected[i].idAbsence).then(function (response) {
                }, function (response) {
                    $scope.error = response;
                });

            }
            $scope.selected = [];
        }

        $scope.showEditAbsence = function(ev, absence) {
            $mdDialog.show({
                controller: EditAbsence,
                templateUrl: 'modules/absence/views/edit-absence.tmpl.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose:true,
                locals: { ancestScope: $scope, absence: absence }
            });
        };

        $scope.showCreateAbsence = function(ev) {
            $mdDialog.show({
                controller: CreateAbsence,
                templateUrl: 'modules/absence/views/edit-absence.tmpl.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose:true,
                locals: { ancestScope: $scope }
            });
        };

        function CreateAbsence($scope, $mdDialog, ancestScope) {
            $scope.absence = {};

            $scope.confirmSave = function() {
                ancestScope.createAbsence($scope.absence);
                $mdDialog.hide();
            };

            $scope.cancel = function() {
                $mdDialog.hide();
            };
        };

        function EditAbsence($scope, $mdDialog, ancestScope, absence) {
            var tmp = $.extend(true, {}, absence);
            $scope.absence = absence;

            $scope.confirmSave = function() {
                ancestScope.updateAbsence(absence);
                $mdDialog.hide();
            };

            $scope.cancel = function() {
                for (var prop in tmp)
                    absence[prop] = tmp[prop];
                $mdDialog.hide();
            };
        };
    }
]);
