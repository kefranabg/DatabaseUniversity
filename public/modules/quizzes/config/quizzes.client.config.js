'use strict';

// Setting up route
angular.module('quizzes').config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {
        // Redirect to home view when route not found
        $urlRouterProvider.otherwise('/');

        // Home state routing
        $stateProvider.
            state('quizzes', {
                url: '/quizzes',
                templateUrl: 'modules/quizzes/views/quizzes.client.view.html'
            });
    }
]);