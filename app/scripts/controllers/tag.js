'use strict';

/**
 * @ngdoc function
 * @name angularjsApp.controller:TagCtrl
 * @description
 * # TagCtrl
 * Controller of the angularjsApp
 */
angular.module('angularjsApp')
  .controller('TagCtrl', function ($scope, $http, $routeParams) {
    $scope.search = true;
    $http
        .get('http://localhost:3000/site/tag/' + $routeParams.tag)
        .success(function(result){
            $scope.sites = result.data;
        });
  });
