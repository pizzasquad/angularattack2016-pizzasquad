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

        Game.reset();

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
            }, function () {
                console.warn(arguments);
                $location.url('/');
            });

        $scope.getTiles = function (map) {
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

        $scope.onClickTile = function (tile) {
            if (!tile.selectable)
                return false;

            Game.select(tile.x, tile.y);
        }

        $scope.getMovesCount = function () {
          return Game.getMovesCount();
        }
    });
