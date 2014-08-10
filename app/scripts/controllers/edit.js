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
    .controller('EditCtrl', function ($scope, $http, $routeParams) {

        var messageDefault = 'Edit';
        $scope.title = messageDefault;
        $scope.screenshot = null;
        $scope.status = '';
        $scope.site = {};
        $scope.tags = '';

        $scope.screenshot = '/images/working.gif';
        $scope.message = 'Working...';
        $http({
            url: 'http://localhost:3000/site/' + $routeParams.id,
            method: 'GET'
        })
        .success(function(response, status){

            if (status === 200) {
                $scope.message = response.success;
                $scope.site = response;
                $scope.screenshot = '/images/screenshots/' + response.lg;

                var tags = [];
                if (response.tags.length > 0) {
                    for(var i=0; i < response.tags.length; i++) {
                        tags.push(response.tags[i].tag);
                    }

                    $scope.tags = tags.join(', ');
                }
            }

            $scope.status = status;
        })
        .error(function(data, status){
            $scope.status = status;
        });

        $scope.save = function(site){

            $http({
                url: 'http://localhost:3000/site/' + $routeParams.id,
                method: 'POST',
                data: site
            })
            .success(function(response, status){

                if (status === 200) {
                    $scope.message = response.success;
                    $scope.screenshot = '/images/screenshots/' + response.data.lg;
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
