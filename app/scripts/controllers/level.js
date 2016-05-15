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

        if ($scope.mapName == 'random') {
            showMap(MapDownloader.generateRandom());
        } else {
            MapDownloader.downloadMap($scope.mapName).then(
                function (response) {
                    showMap(response.data);
                }, function () {
                    console.warn(arguments);
                    $location.url('/');
                });
        }

        function showMap (map) {
            Game.loadMap(map);
            $scope.map = Game.getMap();

            $scope.width = map.width;
            $scope.height = map.height;
        }

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
                  .title('YOU WON')
                  .textContent('Wanna have fun again, bro?')
                  .targetEvent($event);

            var victory = Game.getTilesLeft() <= 0;

            if (victory) {
                confirm.ok('Next Level')
                    .cancel('Retry');
            } else {
                confirm.title('GAME OVER')
                  .ok('Random Map')
                  .textContent('Never give up, bro!')
                  .cancel("Retry")
            }

            $mdDialog.show(confirm).then(function() {
                if (confirm && victory) {
                    // Go to next map
                    $route.updateParams({
                        mapName: MapDownloader.getNextMapName($routeParams.mapName)
                    });
                }

                else if (confirm && !victory) {
                  // Try a random map
                  $route.updateParams({
                    mapName: 'random'
                  });
                }

                $route.reload();
            }, function() {
                // Reload this state
                $route.reload();
            });
        }

        $scope.getMovesCount = function () {
          return Game.getMovesCount();
        }
    });
