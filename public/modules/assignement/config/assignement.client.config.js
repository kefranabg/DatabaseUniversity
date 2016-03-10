'use strict';

// Setting up route
angular.module('assignement').config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {
        // Redirect to home view when route not found
        $urlRouterProvider.otherwise('/');

        // Home state routing
        $stateProvider.
            state('assignement', {
                url: '/assignement',
                templateUrl: 'modules/assignement/views/assignement.client.view.html'
            });
    }
]);