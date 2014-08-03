'use strict';

/**
 * @ngdoc function
 * @name angularjsApp.controller:AddCtrl
 * @description
 * # AddCtrl
 * Controller of the angularjsApp
 */
angular
    .module('angularjsApp')
    .controller('AddCtrl', function ($scope, $http) {
        $scope.add = function(site){
            console.log(site);
            $http({
                url: 'http://localhost:3000/site',
                method: 'POST',
                data: site
            })
            .success(function(data, status, headers, config){
                $scope.reset();
                $scope.status = status;
            })
            .error(function(data, status, headers, config){
                $scope.status = status;
            });
        };

        $scope.reset = function(){
            $scope.site = {};
        };
    });
