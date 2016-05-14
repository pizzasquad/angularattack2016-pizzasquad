'use strict';

/**
 * @ngdoc service
 * @name geeGeeApp.Game
 * @description
 * # Game
 * Factory in the geeGeeApp.
 */
angular.module('geeGeeApp')
  .factory('Game', function (Point) {
    
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
