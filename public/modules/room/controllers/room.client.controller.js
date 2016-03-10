'use strict';

angular.module('room').controller('RoomController', ['$scope', '$http', '$mdDialog',
    function($scope, $http, $mdDialog) {
        $scope.room = null;
        $scope.error = '';
        $scope.selected = [];
        $scope.error = '';
        var bookmark;

        $scope.query = {
            order: 'idRoom',
            limit: 10,
            page: 1,
            search: '',
            predicate: '-idRoom',
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

        $scope.getRoom = function() {
            $http.get('/api/room').then(function (response) {
                $scope.room = response.data;
            }, function (response) {
                $scope.error = response;
            });
        };

        $scope.updateRoom = function(room) {
            $http.put('/api/room/' + room.idRoom, room).then(function (response) {
                $scope.getRoom();
            }, function (response) {
                $scope.error = response;
            });
        }

        $scope.createRoom = function(room) {
            $http.post('/api/room', room).then(function (response) {
                $scope.getRoom();
            }, function (response) {
                console.log(response);
                $scope.error = response;
            });
        }

        $scope.deleteRoom = function() {
            for (var i = 0; i < $scope.selected.length; i++) {
                for (var count in $scope.room) {
                    if ($scope.room[count] === $scope.selected[i]) {
                        $scope.room.splice(count, 1);
                    }
                }

                $http.delete('/api/room/' + $scope.selected[i].idRoom).then(function (response) {
                }, function (response) {
                    $scope.error = response;
                });

            }
            $scope.selected = [];
        }

        $scope.showEditRoom = function(ev, room) {
            $mdDialog.show({
                controller: EditRoom,
                templateUrl: 'modules/room/views/edit-room.tmpl.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose:true,
                locals: { ancestScope: $scope, room: room }
            });
        };

        $scope.showCreateRoom = function(ev) {
            $mdDialog.show({
                controller: CreateRoom,
                templateUrl: 'modules/room/views/edit-room.tmpl.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose:true,
                locals: { ancestScope: $scope }
            });
        };

        function CreateRoom($scope, $mdDialog, ancestScope) {
            $scope.room = {};

            $scope.confirmSave = function() {
                ancestScope.createRoom($scope.room);
                $mdDialog.hide();
            };

            $scope.cancel = function() {
                $mdDialog.hide();
            };
        };

        function EditRoom($scope, $mdDialog, ancestScope, room) {
            var tmp = $.extend(true, {}, room);
            $scope.room = room;

            $scope.confirmSave = function() {
                ancestScope.updateRoom(room);
                $mdDialog.hide();
            };

            $scope.cancel = function() {
                for (var prop in tmp)
                    room[prop] = tmp[prop];
                $mdDialog.hide();
            };
        };
    }
]);
