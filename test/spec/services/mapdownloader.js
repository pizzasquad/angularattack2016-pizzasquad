'use strict';

describe('Service: mapDownloader', function () {

  // load the service's module
  beforeEach(module('geeGeeApp'));

  // instantiate service
  var mapDownloader;
  beforeEach(inject(function (_mapDownloader_) {
    mapDownloader = _mapDownloader_;
  }));

  it('should do something', function () {
    expect(!!mapDownloader).toBe(true);
  });

});
