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

        var processTags = function (tags) {
            var processed = [];

            if (tags !== undefined && tags.length > 0) {
                for (var i=0; i<tags.length; i++) {
                    processed.push(tags[i].tag);
                }
            }

            return processed.join(', ');
        };

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
        .success(function (response){
            $scope.site = response.data;
            $scope.site.tags = processTags(response.data.tags);
            $scope.screenshot = '/images/screenshots/' + response.data.lg;
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
            .success(function (response){
                $scope.site = response.data;
                $scope.site.tags = processTags(response.data.tags);
                $scope.screenshot = '/images/screenshots/' + response.data.lg;
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
