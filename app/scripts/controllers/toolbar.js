'use strict';

/**
 * @ngdoc function
 * @name geeGeeApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the geeGeeApp
 */
angular.module('geeGeeApp')
    .controller('ToolbarCtrl', function ($scope, Game) {
        console.log(Game.getPoints());
        $scope.pointsHandler = Game.getPoints();
    });