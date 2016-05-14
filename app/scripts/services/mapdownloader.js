'use strict';

/**
 * @ngdoc service
 * @name geeGeeApp.MapDownloader
 * @description
 * # MapDownloader
 * Service in the geeGeeApp.
 */
angular.module('geeGeeApp')
  .service('MapDownloader', function ($http, $q) {
    
    var PATH = '../../app/maps/';

    this.downloadMap = function (mapName) {
    	$http.get(mapName).then(handleSuccess, handleError);
    };


	// Private functions for handling http responses     
    function handleSuccess(res) {
        return res.data;
    }

    function handleError(res) {
        return $q.reject(res.data);
    }

  });
