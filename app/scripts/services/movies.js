'use strict';

/**
 * @ngdoc service
 * @name angularjsApp.movies
 * @description
 * # movies
 * Service in the angularjsApp.
 */
angular.module('angularjsApp')
  .service('Movies', function Movies() {

    var top5 = [
        {name: 'Sunsine'},
        {name: 'Wall-e'},
        {name: 'Life of Brian'},
        {name: 'Fight Club'},
        {name: 'Shawshank'},
    ];

    return {
        top5: function(){
            return top5;
        }
    };
  });
