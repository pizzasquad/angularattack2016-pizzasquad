'use strict';

/**
 * @ngdoc function
 * @name geeGeeApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the geeGeeApp
 */
angular.module('geeGeeApp')
    .controller('LevelCtrl', function ($scope, Point, $routeParams, $location, MapDownloader, Game) {
        if (!$routeParams.mapName)
            $location.url('/');

        $scope.mapName = $routeParams.mapName;
        MapDownloader.downloadMap($scope.mapName).then(
            function (response) {
                Game.loadMap(response.data);
                $scope.map = Game.getMap();
            }, function () {
                console.warn(arguments);
            });

        $scope.addPoints = function (nPoints) {
            Point.addPoints(nPoints);
        }
    });
