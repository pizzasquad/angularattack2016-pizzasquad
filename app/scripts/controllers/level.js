'use strict';

/**
 * @ngdoc function
 * @name geeGeeApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the geeGeeApp
 */
angular.module('geeGeeApp')
    .controller('LevelCtrl', function ($scope, Point, $route, $routeParams, $location, $mdDialog, MapDownloader, Game) {
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

        $scope.onClickTile = function (tile, $event) {
            if (!tile.selectable)
                return false;

            Game.select(tile.x, tile.y);

            if (Game.isGameOver())
                gameEnd($event);
        }

        /*
         * Call this function when the game end.
        */
        function gameEnd ($event) {
            var confirm = $mdDialog.confirm()
                  .title('Game Over')
                  .textContent('Would you like to start a new game?')
                  .targetEvent($event);

            var victory = Game.getTilesLeft() <= 0;

            if (victory) {
                confirm.ok('Next Level')
                    .cancel('Retry');
            } else {
                confirm.ok("Retry");
            }

            $mdDialog.show(confirm).then(function() {
                if (victory) {
                    // Go to next map
                } else {
                    Point.resetPoints();
                    $route.reload();
                }
            }, function() {
                $route.reload();
            });
        }

        $scope.getMovesCount = function () {
          return Game.getMovesCount();
        }
    });
