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

        this.tilesLeft = 0;
        this.mapWidth = 10;
        this.mapHeight = 10;

        this.reset = function () {
            // Create a new point object
            this.points = Point;

            // This map will be crated by the loadMap method
            this.map = undefined;

            // Counter of title to fill left
            this.tilesLeft = 0;

            // counter of available tile
            this.availbleTiles = 0;
        };

        /**
         * @ngdoc method
         * @name loadMap
         * @description
         * @param mapData map object downloaded with MapDownloader service
         * Load the map from the static file
         */
        this.loadMap = function (mapData) {
            this.mapWidth = mapData.width;
            this.mapHeight = mapData.height;

            // Create map matrix
            this.map = new Array(mapData.height);

            // Initialize matrix
            for (var i = 0; i < mapData.height; i++) {
                this.map[i] = new Array(mapData.width);
                for (var j = 0; j < mapData.width; j++) {
                    this.map[i][j] = {
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
                this.map[mapData.mapTiles[i].y][mapData.mapTiles[i].x] = {
                    type: TILE.TO_FILL,
                    filled: false,
                    selectable: true,
                    x: mapData.mapTiles[i].x,
                    y: mapData.mapTiles[i].y
                };
            }

            this.availableTiles = mapData.mapTiles.length;
        };

        /**
         * @ngdoc method
         * @name getMap
         * @description
         * Return the map of the game, to draw it
         */
        this.getMap = function () {
            return this.map;
        };

        /**
         * @ngdoc method
         * @name getPoints
         * @description
         * Return the point oobject of this game
         */
        this.getPoints = function () {
            return this.points;
        };

        /**
         * @ngdoc method
         * @name isGameOver
         * @description
         */
        this.isGameOver = function () {
            return this.tilesLeft > 0 && this.availableTiles > 0;
        };

        /**
         * @ngdoc method
         * @name isSelectable
         * @description
         * Return true if the tile is selectable (TO_FILL or TO_NOT_FILL)
         */
        this.isSelectable = function (x, y) {
            return this.map[x][y].selectable;
        };

        /**
         * @ngdoc method
         * @name select
         * @description
         * Select the specified tile and update the map with the new available tile
         */
        this.select = function (x, y) {
            // Change the flag of the tile
            this.map[y][x].filled = true;

            // Update the counter of the tile to fill left
            if (this.map[y][x].type === TILE.TO_FILL) {
                this.tilesLeft--;
                Point.addPoints(10);
            }

            // Update the map with the new available tiles
            this._updateAvailableTile(x, y);
        };

        /**
         * @ngdoc method
         * @name _updatrAvailableTile
         * @description
         * Update the map, changing the tile state to match the new game state.
         */
        this._updateAvailableTile = function (lastSelectedX, lastSelectedY) {
            // Clear the map, removing all the selectable tiles
            this.availableTiles = 0;
            this.tilesLeft = 0;

            for (var rowNum in this.map) {
                if (!this.map.hasOwnProperty(rowNum))
                    continue;

                var tiles = this.map[rowNum];
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

            var self = this;

            for (var positionTypes in validPositionsCoordinates) {
                if (!validPositionsCoordinates.hasOwnProperty(positionTypes))
                    continue;

                var xCoordinates = validPositionsCoordinates[positionTypes].x;
                var yCoordinates = validPositionsCoordinates[positionTypes].y;

                xCoordinates.forEach(function (x) {
                    yCoordinates.forEach(function (y) {
                        if (x >= 0 && x < self.mapWidth && y >= 0 && y < self.mapHeight) {
                            self.map[y][x].selectable = true;

                            self.availableTiles++;
                        }
                    });
                });
            }

            // Switch state of the tile
            /*if (row[j].type === TILE.TO_FILL || row[j] == TILE.TO_NOT_FILL) {
                row[j] = row[j] == TILE.TO_FILL ? TILE.SELECTABLE : TILE.SELECTABLE_TO_NOT_FILL;

                if (row[j] == TILE.SELECTABLE) {
                    this.tileLeft++;
                }
                this.availableTiles++;
            } */
        };

        this.reset();
        return this;
    });
