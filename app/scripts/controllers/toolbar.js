'use strict';

/**
 * @ngdoc function
 * @name geeGeeApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the geeGeeApp
 */
angular.module('geeGeeApp')
    .controller('ToolbarCtrl', function ($scope, $routeParams, Game) {
        $scope.pointsHandler = Game.getPoints();

        $scope.game = Game;

        $scope.params = $routeParams;
    });