'use strict';

angular.module('core').filter('secondsToDateTime', [function() {
    return function(seconds) {
        return new Date(1970, 0, 1).setSeconds(seconds);
    };
}])

angular.module('core').controller('HomeController', ['$scope', '$http',
    function($scope, $http) {
        $scope.urlVideo = 'https://youtu.be/Vnwahzfi-gY';
        $scope.playingTime = 0;
        $scope.averageTimeVideo = 0;
        $scope.nbCompleted = 0;
        $scope.completedViews = false;

        $scope.$on('youtube.player.ended', function ($event, player) {
            clearInterval($scope.interval);
            $scope.completedViews = true;
        });

        $scope.$on('youtube.player.paused', function ($event, player) {
            clearInterval($scope.interval);
        });

        $scope.$on('youtube.player.playing', function ($event, player) {
            $scope.interval = setInterval(function() {
                $scope.playingTime++;
            }, 1000);
        });

        $http.get('/api/video').then(function (response) {
            $scope.averageTimeVideo = response.data.Average;
        }, function (response) {
            $scope.error = response;
        });

        $http.get('/api/video/completed').then(function (response) {
            $scope.nbCompleted = response.data.completed
        }, function (response) {
            $scope.error = response;
        });


        $scope.$on('$locationChangeStart', function (event, next, current) {
            if ($scope.playingTime !== 0) {
                $http.post('/api/video', {elapsedTime: $scope.playingTime, completedViews: $scope.completedViews}).then(function (response) {
                }, function (response) {
                    $scope.error = response;
                });
            }
            confirm("Are you sure you want to leave this page??");
        });

        window.onbeforeunload = function (event) {
            if ($scope.playingTime !== 0) {
                $http.post('/api/video', {elapsedTime: $scope.playingTime, completedViews: $scope.completedViews}).then(function (response) {
                }, function (response) {
                    $scope.error = response;
                });
            }

            return "Are you sure you want to leave this page?";
        };
    }
]);
