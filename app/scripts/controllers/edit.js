'use strict';

/**
 * @ngdoc function
 * @name angularjsApp.controller:EditCtrl
 * @description
 * # EditCtrl
 * Controller of the angularjsApp
 */
angular.module('angularjsApp')
  .controller('EditCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
