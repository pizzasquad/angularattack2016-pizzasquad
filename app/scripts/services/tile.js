'use strict';

/**
 * @ngdoc service
 * @name geeGeeApp.TILE
 * @description
 * # TILE
 * Constant that describe the state of a single tile
 */
angular.module('geeGeeApp')
  .constant('TILE', {
  	FILLED: 'FILLED',
  	FILLED_WRONG: 'FILLED_WRONG',
  	TO_FILL: 'TO_FILL',
  	TO_NOT_FILL: 'TO_NOT_FILL',
  	SELECTABLE: 'SELECTABLE',
  	SELECTABLE_TO_NOT_FILL: 'SELECTABLE_TO_NOT_FILL'
  });
