'use strict';

angular.module('core').controller('LayoutController', ['$scope',
    function($scope) {

        // Open User menu
        $scope.openMenu = function($mdOpenMenu, ev) {
            $mdOpenMenu(ev);
        };

    }
]);
