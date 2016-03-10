'use strict';

// Setting up route
angular.module('building').config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {
        // Redirect to home view when route not found
        $urlRouterProvider.otherwise('/');

        // Home state routing
        $stateProvider.
            state('building', {
                url: '/building',
                templateUrl: 'modules/building/views/building.client.view.html'
            });
    }
]);