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
     * Load the map from the static file
    */
    game.loadMap = function () {
      // TODO: decidere se caricare la mappa qui dentro, passando il nome come argomento o se ricevere direttamente
      // l'oggetto già caricato
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
    }

    /**
     * @ngdoc method
     * @name isGameOver
     * @description 
    */
    game.isGameOver = function () {
        
        // Check if there is no one tile left to fill
        if (this.tileLeft <= 0) {
            return true;
        }
    };

    /**
     * @ngdoc method
     * @name isSelectable
     * @description 
    */
    game.isSelectable = function (x, y) {
        return this.map[x][y] == TILE.TO_FILL || this.map[x][y] == TILE.TO_NOT_FILL;
    };

    /**
     * @ngdoc method
     * @name select
     * @description
     * Select the specified tile and update the map with the new available tile 
    */
    game.select = function (x, y) {

        // Change the flag of the tile
        this.map[x][y] = this.map[x][y] == TILE.TO_FILL ? TILE.FILLED : TILE.FILLED_WRONG;

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
    game._updateAvailableTile = function () {

    }

    return game;

  });
