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
        
    	$scope.selectedTab = 0;

    	$scope.nextTab = function () {
    		$scope.selectedTab++;
    	};

    	$scope.previousTab = function () {
    		$scope.selectedTab--;
    	};

        $scope.goToMap = function (mapName) {
            $location.url('/level/' + mapName);
        }
    });
