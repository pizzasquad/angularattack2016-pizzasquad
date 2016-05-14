'use strict';

describe('Service: TILE', function () {

  // load the service's module
  beforeEach(module('geeGeeApp'));

  // instantiate service
  var TILE;
  beforeEach(inject(function (_TILE_) {
    TILE = _TILE_;
  }));

  it('should do something', function () {
    expect(!!TILE).toBe(true);
  });

});
