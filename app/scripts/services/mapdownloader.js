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
    
    const PATH = '/maps/';

    // List of available maps
    var levelsList = undefined;

    /**
     * @ngdoc method
     * @name init
     * @description
     * Prepare the map downloader factory
    */
    this.init = function () {
    	$http.get('maps/levels.json').then(function (response) {
    		levelsList = response.data;
    	});
    };

    /**
     * @ngdoc method
     * @name downloadMap
     * @description
     * Download the map with the specified name
     * @param mapName name of the map
    */
    this.downloadMap = function (mapName) {
        console.debug('[DOWNLOADER] Loading map ' + mapName);
    	return $http.get(PATH + mapName + '.json');
    };

    /**
     * @ngdoc method
     * @name getNextMapName
     * @description
     * Return the name of the next map
    */
    this.getNextMapName = function (currentMapName) {
    	// Find the current map name index
    	var currentIndex = levelsList.indexOf(currentMapName);

    	// Is the last?
    	if (currentIndex < 0 || currentIndex + 1 > levelsList.length) {
    		return 'random';
    	}

    	return levelsList[currentIndex + 1];
    };

    /**
     * @ngdoc method
     * @name generateRandom
     * @description
     * Return a new random generated map
    */
    this.generateRandom = function () {

    	var tiles = [];
		var map = {
			width: 10,
			height: 10,
			mapTiles: tiles
		};

    	for (var i = 0;i < 10;i++) {
    		for (var j = 0;j < 10;j++){
	    		if (Math.random() > 0.3) {
	    			tiles.push({
	    				x: i,
	    				y: j
	    			})
	    		}
    		}
   		}

   		return map;
    };


    this.init();
  });
