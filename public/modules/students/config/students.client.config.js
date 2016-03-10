'use strict';

// Setting up route
angular.module('students').config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {
        // Redirect to home view when route not found
        $urlRouterProvider.otherwise('/');

        // Home state routing
        $stateProvider.
            state('students', {
                url: '/students',
                templateUrl: 'modules/students/views/students.client.view.html'
            });
    }
]);