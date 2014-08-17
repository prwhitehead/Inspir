'use strict';

/**
 * @ngdoc function
 * @name angularjsApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the angularjsApp
 */
angular.module('angularjsApp')
  .controller('ListCtrl', function ($scope, $http) {
    $scope.search = true;
    $http
      .get('http://localhost:3000/sites')
      .success(function(result){
        $scope.sites = result;
      });
  });
