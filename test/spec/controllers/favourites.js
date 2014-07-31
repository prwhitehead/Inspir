'use strict';

describe('Controller: FavouritesCtrl', function () {

  // load the controller's module
  beforeEach(module('angularjsApp'));

  var FavouritesCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    FavouritesCtrl = $controller('FavouritesCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
