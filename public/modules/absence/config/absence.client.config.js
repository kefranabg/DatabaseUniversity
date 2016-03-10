'use strict';

// Setting up route
angular.module('absence').config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {
        // Redirect to home view when route not found
        $urlRouterProvider.otherwise('/');

        // Home state routing
        $stateProvider.
            state('absence', {
                url: '/absence',
                templateUrl: 'modules/absence/views/absence.client.view.html'
            });
    }
]);