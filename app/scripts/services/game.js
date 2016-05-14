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
      this.points = new Point();
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
        this.map = new Array(mapData.width);
        for (var i = 0; i < mapData.width; i++){
            this.map[i] = new Array(mapData.height);
        }

        // Initialize matrix
        for (var i = 0; i < mapData.width; i++){
            for (var j = 0; j < mapData.height; j++){
                this.map[i][j] = TILE.TO_NOT_FILL;
            }
        }

        // Load map data in to matrix
        for (var i = 0; i < mapData.mapTiles.length; i++){
            this.map[mapData.mapTiles.x][mapData.mapTiles.y] = TILE.TO_FILL;
        }
    };

    /**
     * @ngdoc method
     * @name getMap
     * @description 
     * Return the map of the game, to draw it
    */
    game.getMap = function () {

    };

    /**
     * @ngdoc method
     * @name isGameOver
     * @description 
    */
    game.isGameOver = function () {

    };

    /**
     * @ngdoc method
     * @name isSelectable
     * @description 
    */
    game.isSelectable = function (x, y) {

    };

    // TODO: implements all the other methods

    return game;

  });
