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

        $scope.map = null;
        $scope.width = 10;
        $scope.height = 10;

        $scope.mapName = $routeParams.mapName;
        MapDownloader.downloadMap($scope.mapName).then(
            function (response) {
                Game.loadMap(response.data);
                $scope.map = Game.getMap();

                $scope.width = response.data.width;
                $scope.height = response.data.height;

                console.log($scope.map);
            }, function () {
                console.warn(arguments);
                $location.url('/');
            });

        $scope.getNumTiles = function (map) {
            var ans = [];
            for (var lineNum in map) {
                if (!map.hasOwnProperty(lineNum))
                    continue;

                map[lineNum].forEach(function (tile) {
                    ans.push(tile);
                });
            }

            return ans;
        };

        $scope.clickedTile = function (tile) {
            if (!tile.selectable)
                return false;

            if (tile.type === "TO_FILL")
                Point.addPoints(10);
            else
                Point.removePoints(20);

            tile.selectable = false;
            tile.filled = true;
        }
    });
