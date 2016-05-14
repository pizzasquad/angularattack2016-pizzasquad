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

    var game = function () {
      this.reset();
    };

    /**
     * @ngdoc method
     * @name reset
     * @description
     * Reset the game to reuse this object
    */
    game.reset = function () {

      // Create a new point object
      this.points = new Point();

      // This map will be crated by the loadMap method
      this.map = undefined;

      // Counter of title to fill left
      this.tileLeft = 0;

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
    game.loadMap = function (mapData) {
        // Create map matrix
        this.map = new Array(mapData.height);

        // Initialize matrix
        for (var i = 0; i < mapData.height; i++){
            this.map[i] = new Array(mapData.width);
            for (var j = 0; j < mapData.width; j++){
                this.map[i][j] = TILE.TO_NOT_FILL;
            }
        }
        // Load map data in to matrix
        for (var i = 0; i < mapData.mapTiles.length; i++){
            this.map[mapData.mapTiles[i].y][mapData.mapTiles[i].x] = TILE.TO_FILL;
        }
        console.log(this.map);
    };

    /**
     * @ngdoc method
     * @name getMap
     * @description
     * Return the map of the game, to draw it
    */
    game.getMap = function () {
        return this.map;
    };

    /**
     * @ngdoc method
     * @name getPoinst
     * @description
     * Return the point oobject of this game
    */
    game.getPoints = function () {
        return this.points;
    };

    /**
     * @ngdoc method
     * @name isGameOver
     * @description
    */
    game.isGameOver = function () {

        return this.tileLeft > 0 && this.availableTiles > 0;
    };

    /**
     * @ngdoc method
     * @name isSelectable
     * @description
     * Return true if the tile is selectable (TO_FILL or TO_NOT_FILL)
    */
    game.isSelectable = function (x, y) {
        return this.map[x][y] == TILE.SELECTABLE || this.map[x][y] == TILE.SELECTABLE_TO_NOT_FILL;
    };

    /**
     * @ngdoc method
     * @name select
     * @description
     * Select the specified tile and update the map with the new available tile
    */
    game.select = function (x, y) {

        // Change the flag of the tile
        this.map[x][y] = this.map[x][y] == TILE.SELECTABLE ? TILE.FILLED : TILE.FILLED_WRONG;

        // Update the counter of the tile to fill left
        if (this.map[x][y] == TILE.FILLED) {
            this.tileLeft--;
        }

        // Update the map with the new available tiles
        this._updateAvailableTile();
    };

    /**
     * @ngdoc method
     * @name _updatrAvailableTile
     * @description
     * Update the map, changing the tile state to match the new game state.
    */
    game._updateAvailableTile = function (lastSelectedX, lastSelectedY) {
        // Clear the map, removing all the selectable tiles
        this.availableTiles = 0;
        this.tileLeft = 0;
        for (var i in this.map) {
            if (!this.map.hasOwnProperty(i))
                continue;

            var row = this.map[i];
            for (var j = 0;j < row.length;j++) {

                // Return to the not selectable state
                row[j] = row[j] == TILE.SELECTABLE ? TILE.TO_FILL : TILE.TO_NOT_FILL;
            }
        }

        var minX = Math.min(0, lastselectedX - 2);
        var maxX = Math.min(this.map.length, lastselectedX + 2);

        var minY = Math.min(0, lastselectedY - 2);
        var maxY = Math.min(this.map.length, lastselectedX + 2);

        // Now find the new selectable tiles and update them
        for (i = minX; i < maxX; i++) {
            row = this.map[i];
            for (j = minY; j < maxY; j++) {
                if (j != 0 && i != o && i % 2 != 0 && j % 2 != 0) {
                    // Switch state of the tile
                    if (row[j] == TILE.TO_FILL || row[j] == TILE.TO_NOT_FILL) {
                        row[j] = row[j] == TILE.TO_FILL ? TILE.SELECTABLE : TILE.SELECTABLE_TO_NOT_FILL;

                        if (row[j] == TILE.SELECTABLE) {
                            this.tileLeft++;
                        }
                        this.availableTiles++;
                    }
                }
            }
        }
    };

    return game;

  });
