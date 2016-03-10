'use strict';

// Setting up route
angular.module('courses').config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {
        // Redirect to home view when route not found
        $urlRouterProvider.otherwise('/');

        // Home state routing
        $stateProvider.
            state('courses', {
                url: '/courses',
                templateUrl: 'modules/courses/views/courses.client.view.html'
            });
    }
]);