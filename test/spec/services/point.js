'use strict';

describe('Service: Point', function () {

  // load the service's module
  beforeEach(module('geeGeeApp'));

  // instantiate service
  var Point;
  beforeEach(inject(function (_Point_) {
    Point = _Point_;
  }));

  it('should do something', function () {
    expect(!!Point).toBe(true);

    // Try to add some points
    Point.addPoints(5);
    expect(Point.getPoints()).toBe(5);

    // Try to remove some points
    Point.remove(5);
    expect(Point.getPoints()).toBe(0);
  });

});
