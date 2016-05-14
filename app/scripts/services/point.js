'use strict';

/**
 * @ngdoc service
 * @name geeGeeApp.Point
 * @description
 * # Point
 * Factory in the geeGeeApp.
 */
angular.module('geeGeeApp')
    .factory('Point', function () {
        var points = 0;

        this.getPoints = function () {
            return points;
        };

        this.addPoints = function (pointsToAdd) {
            points += pointsToAdd;
        };

        // FIXME: @Deprecated
        this.remove = function (pointsToRemove) {
            this.removePoints(pointsToRemove);
        };

        this.removePoints = function (pointsToRemove) {
            points -= pointsToRemove;
        };

        return this;
    });
