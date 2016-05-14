'use strict';

/**
 * @ngdoc function
 * @name geeGeeApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the geeGeeApp
 */
angular.module('geeGeeApp')
    .controller('LevelCtrl', function ($scope, Point, $routeParams, $location, MapDownloader) {
        if (!$routeParams.mapName)
            $location.url('/');

        $scope.mapName = $routeParams.mapName;
        MapDownloader.downloadMap($scope.mapName).then(
            function (response) {
                console.log(response.data);

            }, function () {
                console.warn(arguments);
            });

        $scope.addPoints = function (nPoints) {
            Point.addPoints(nPoints);
        }
    });
