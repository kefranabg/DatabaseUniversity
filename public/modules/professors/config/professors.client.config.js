'use strict';

// Setting up route
angular.module('professors').config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {
        // Redirect to home view when route not found
        $urlRouterProvider.otherwise('/');

        // Home state routing
        $stateProvider.
            state('professors', {
                url: '/professors',
                templateUrl: 'modules/professors/views/professors.client.view.html'
            });
    }
]);