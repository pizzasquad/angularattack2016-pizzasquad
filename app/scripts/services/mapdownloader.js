'use strict';

/**
 * @ngdoc service
 * @name geeGeeApp.MapDownloader
 * @description
 * # MapDownloader
 * Service in the geeGeeApp.
 */
angular.module('geeGeeApp')
  .service('MapDownloader', function ($http) {
    const PATH = '/maps/';

    this.downloadMap = function (mapName) {
        console.debug('[DOWNLOADER] Loading map ' + mapName);
    	return $http.get(PATH + mapName + '.json');
    };

  });
