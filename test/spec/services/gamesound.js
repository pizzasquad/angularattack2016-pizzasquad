'use strict';

describe('Service: GameSound', function () {

  // load the service's module
  beforeEach(module('geeGeeApp'));

  // instantiate service
  var GameSound;
  beforeEach(inject(function (_GameSound_) {
    GameSound = _GameSound_;
  }));

  it('should do something', function () {
    expect(!!GameSound).toBe(true);
  });

});
