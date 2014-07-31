'use strict';

/**
 * @ngdoc function
 * @name angularjsApp.controller:FavouritesCtrl
 * @description
 * # FavouritesCtrl
 * Controller of the angularjsApp
 */
angular.module('angularjsApp')
  .controller('FavouritesCtrl', function ($scope, Movies) {
    $scope.movies = Movies.top5();

    //this is the ng-click function which is run from the favourites view
    $scope.save = function(movie){
      console.log('updated movie name is: ' + movie.name);
    };
  });
