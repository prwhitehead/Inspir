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
    .controller('AddCtrl', function ($scope, $http, $location) {
        var messageDefault = 'Awaiting your url';
        $scope.message = messageDefault;
        $scope.screenshot = null;
        $scope.status = '';

        $scope.save = function(site){

            $scope.screenshot = '/images/working.gif';
            $scope.message = 'Working...';
            $http({
                url: 'http://localhost:3000/site',
                method: 'PUT',
                data: site
            })
            .success(function(response, status){

                if (status === 200) {
                    return $location.path('/edit/' + response.data._id);
                }

                $scope.status = status;
            })
            .error(function(data, status){
                $scope.status = status;
            });
        };

        $scope.reset = function(){
            $scope.site = {};
            $scope.message = messageDefault;
            $scope.screenshot = null;
        };
    });
