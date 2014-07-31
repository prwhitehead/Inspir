'use strict';

describe('Service: movies', function () {

  // load the service's module
  beforeEach(module('angularjsApp'));

  // instantiate service
  var movies;
  beforeEach(inject(function (_movies_) {
    movies = _movies_;
  }));

  it('should do something', function () {
    expect(!!movies).toBe(true);
  });

});
