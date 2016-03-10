'use strict';

angular.module('building').controller('BuildingController', ['$scope', '$http', '$mdDialog',
    function($scope, $http, $mdDialog) {
        $scope.building = null;
        $scope.error = '';
        $scope.selected = [];
        $scope.error = '';
        var bookmark;

        $scope.query = {
            order: 'idbuilding',
            limit: 10,
            page: 1,
            search: '',
            predicate: '-idBuilding',
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

        $scope.getBuilding = function() {
            $http.get('/api/building').then(function (response) {
                $scope.getBuilding();
            }, function (response) {
                $scope.error = response;
            });
        };

        $scope.updateBuilding = function(building) {
            $http.put('/api/building/' + building.idBuilding, building).then(function (response) {
                $scope.getBuilding();
            }, function (response) {
                $scope.error = response;
            });
        }

        $scope.createBuilding = function(building) {
            $http.post('/api/building', building).then(function (response) {
                $scope.building.push(building);
            }, function (response) {
                console.log(response);
                $scope.error = response;
            });
        }

        $scope.deleteBuilding = function() {
            for (var i = 0; i < $scope.selected.length; i++) {
                for (var count in $scope.building) {
                    if ($scope.building[count] === $scope.selected[i]) {
                        $scope.building.splice(count, 1);
                    }
                }

                $http.delete('/api/building/' + $scope.selected[i].idBuilding).then(function (response) {
                }, function (response) {
                    $scope.error = response;
                });

            }
            $scope.selected = [];
        }

        $scope.showEditBuilding = function(ev, building) {
            $mdDialog.show({
                controller: EditBuilding,
                templateUrl: 'modules/building/views/edit-building.tmpl.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose:true,
                locals: { ancestScope: $scope, building: building }
            });
        };

        $scope.showCreateBuilding = function(ev) {
            $mdDialog.show({
                controller: CreateBuilding,
                templateUrl: 'modules/building/views/edit-building.tmpl.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose:true,
                locals: { ancestScope: $scope }
            });
        };

        function CreateBuilding($scope, $mdDialog, ancestScope) {
            $scope.building = {};

            $scope.confirmSave = function() {
                ancestScope.createBuilding($scope.building);
                $mdDialog.hide();
            };

            $scope.cancel = function() {
                $mdDialog.hide();
            };
        };

        function EditBuilding($scope, $mdDialog, ancestScope, building) {
            var tmp = $.extend(true, {}, building);
            $scope.building = building;

            $scope.confirmSave = function() {
                ancestScope.updateBuilding(building);
                $mdDialog.hide();
            };

            $scope.cancel = function() {
                for (var prop in tmp)
                    building[prop] = tmp[prop];
                $mdDialog.hide();
            };
        };
    }
]);
