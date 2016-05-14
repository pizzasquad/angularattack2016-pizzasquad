'use strict';

/**
 * @ngdoc function
 * @name geeGeeApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the geeGeeApp
 */
angular.module('geeGeeApp')
  .controller('MainCtrl', ['Game', function (Game) {
    this.map = Game.getMap();
    console.log(this.map);
  }]);