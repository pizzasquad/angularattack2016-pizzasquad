'use strict';

/**
 * @ngdoc function
 * @name geeGeeApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the geeGeeApp
 */
angular.module('geeGeeApp')
    .controller('MainCtrl', function ($scope, Point, $location) {
        $scope.goToMap = function (mapName) {
            $location.url('/level/' + mapName);
        }
    });
