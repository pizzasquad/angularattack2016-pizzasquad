'use strict';

/**
 * @ngdoc overview
 * @name geeGeeApp
 * @description
 * # geeGeeApp
 *
 * Main module of the application.
 */
angular
    .module('geeGeeApp', [
        'ngCookies',
        'ngResource',
        'ngRoute',
        'ngSanitize',
        'ngMaterial'
    ])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/main.html',
                controller: 'MainCtrl',
                controllerAs: 'main'
            })
            .when('/level/:mapName', {
                templateUrl: 'views/level.html',
                controller: 'LevelCtrl',
                controllerAs: 'level'
            })
            .when('/authors', {
              templateUrl: 'views/authors.html',
              controller: 'AuthorsCtrl',
              controllerAs: 'authors'
            })
            .otherwise({
                redirectTo: '/'
            });
    })
  .config(function($mdThemingProvider) {
    $mdThemingProvider.theme('default')
      .primaryPalette('teal')
      .accentPalette('orange');
  });
