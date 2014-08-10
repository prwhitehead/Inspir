'use strict';

/**
 * @ngdoc overview
 * @name angularjsApp
 * @description
 * # angularjsApp
 *
 * Main module of the application.
 */
angular
  .module('angularjsApp', [
    'ngResource',
    'ngRoute',
    'ngSanitize'
  ])
  .config(function ($routeProvider, $locationProvider) {
    $routeProvider
      .when('/list', {
        templateUrl: 'views/list.html',
        controller: 'ListCtrl'
      })
      .when('/add', {
        templateUrl: 'views/form.html',
        controller: 'AddCtrl'
      })
      .when('/edit/:id', {
        templateUrl: 'views/form.html',
        controller: 'EditCtrl'
      })
      .otherwise({
        redirectTo: '/list'
      });

    // $locationProvider.html5Mode(true);
  });
