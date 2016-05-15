'use strict';

/**
 * @ngdoc service
 * @name geeGeeApp.Game
 * @description
 * # Game
 * Factory in the geeGeeApp.
 */
angular.module('geeGeeApp')
    .factory('Game', function (Point, TILE) {
        /**
         * @ngdoc method
         * @name reset
         * @description
         * Reset the game to reuse this object
         */

        var tilesLeft = 0;
        var availableTiles = 0;

        var mapWidth = 10;
        var mapHeight = 10;

        var map = null;
        var points = null;

        // Moves counter
        var moves;

        this.reset = function () {
            // Create a new point object
            points = Point;

            // This map will be crated by the loadMap method
            map = null;

            // Counter of title to fill left
            tilesLeft = 0;

            // counter of available tile
            availableTiles = 0;

            // Reset moves counter
            moves = 0;
        };

        /**
         * @ngdoc method
         * @name loadMap
         * @description
         * @param mapData map object downloaded with MapDownloader service
         * Load the map from the static file
         */
        this.loadMap = function (mapData) {
            mapWidth = mapData.width;
            mapHeight = mapData.height;

            // Create map matrix
            map = new Array(mapData.height);

            // Initialize matrix
            for (var i = 0; i < mapData.height; i++) {
                map[i] = new Array(mapData.width);
                for (var j = 0; j < mapData.width; j++) {
                    map[i][j] = {
                        type: TILE.TO_NOT_FILL,
                        filled: false,
                        selectable: true,
                        x: j,
                        y: i
                    };
                }
            }

            // Load map data in to matrix
            for (i = 0; i < mapData.mapTiles.length; i++) {
                map[mapData.mapTiles[i].y][mapData.mapTiles[i].x] = {
                    type: TILE.TO_FILL,
                    filled: false,
                    selectable: true,
                    x: mapData.mapTiles[i].x,
                    y: mapData.mapTiles[i].y
                };
            }

            availableTiles = mapWidth * mapHeight;
            tilesLeft = mapData.mapTiles.length;
        };

        /**
         * @ngdoc method
         * @name getMap
         * @description
         * Return the map of the game, to draw it
         */
        this.getMap = function () {
            return map;
        };

        /**
         * @ngdoc method
         * @name getPoints
         * @description
         * Return the point oobject of this game
         */
        this.getPoints = function () {
            return points;
        };

        /**
         * @ngdoc method
         * @name isGameOver
         * @description
         */
        this.isGameOver = function () {
            return tilesLeft <= 0 || availableTiles <= 0;
        };

        /**
         * @ngdoc method
         * @name isSelectable
         * @description
         * Return true if the tile is selectable (TO_FILL or TO_NOT_FILL)
         */
        this.isSelectable = function (x, y) {
            return map[x][y].selectable;
        };

        /**
         * @ngdoc method
         * @name _updatrAvailableTile
         * @description
         * Update the map, changing the tile state to match the new game state.
         */
        var _updateAvailableTile = function (lastSelectedX, lastSelectedY) {
            // Clear the map, removing all the selectable tiles
            availableTiles = 0;

            for (var rowNum in map) {
                if (!map.hasOwnProperty(rowNum))
                    continue;

                var tiles = map[rowNum];
                for (var j = 0; j < tiles.length; j++) {
                    // Return to the not selectable state
                    tiles[j].selectable = false;
                }
            }

            var validPositionsCoordinates = {
                horizontal: {
                    x: [lastSelectedX - 1, lastSelectedX + 1],
                    y: [lastSelectedY - 2, lastSelectedY + 2]
                },
                vertical: {
                    x: [lastSelectedX - 2, lastSelectedX + 2],
                    y: [lastSelectedY - 1, lastSelectedY + 1]
                }
            };

            for (var positionTypes in validPositionsCoordinates) {
                if (!validPositionsCoordinates.hasOwnProperty(positionTypes))
                    continue;

                var xCoordinates = validPositionsCoordinates[positionTypes].x;
                var yCoordinates = validPositionsCoordinates[positionTypes].y;

                xCoordinates.forEach(function (x) {
                    yCoordinates.forEach(function (y) {
                        if (x >= 0 && x < mapWidth && y >= 0 && y < mapHeight) {
                            if (!map[y][x].filled) {
                                map[y][x].selectable = true;

                                availableTiles++;
                            }
                        }
                    });
                });
            }
        };

        this.getAvailableTiles = function () {
            return availableTiles;
        };

        this.getTilesLeft = function () {
            return tilesLeft;
        };

        /**
         * @ngdoc method
         * @name select
         * @description
         * Select the specified tile and update the map with the new available tile
         */
        this.select = function (x, y) {
            // Change the flag of the tile
            map[y][x].filled = true;

            // Update the counter of the tile to fill left
            if (map[y][x].type === TILE.TO_FILL) {
                tilesLeft--;
                Point.addPoints(10);
            }
            else Point.removePoints(10);

            // Update the map with the new available tiles
            _updateAvailableTile(x, y);

            // Increment the moves counter
            moves++;
        };

        /**
         * @ngdoc method
         * @name getMovesCount
         * @description
         * Return the number of moves.
         */
        this.getMovesCount = function () {
            return moves;
        };

        this.reset();
        return this;
    });
