'use strict';

// Setting up route
angular.module('grade').config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {
        // Redirect to home view when route not found
        $urlRouterProvider.otherwise('/');

        // Home state routing
        $stateProvider.
            state('grade', {
                url: '/grade',
                templateUrl: 'modules/grade/views/grade.client.view.html'
            });
    }
]);