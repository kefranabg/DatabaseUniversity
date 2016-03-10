'use strict';

// Setting up route
angular.module('room').config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {
        // Redirect to home view when route not found
        $urlRouterProvider.otherwise('/');

        // Home state routing
        $stateProvider.
            state('room', {
                url: '/room',
                templateUrl: 'modules/room/views/room.client.view.html'
            });
    }
]);