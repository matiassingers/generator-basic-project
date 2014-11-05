'use strict';

var assert = require('assert');

describe('basic project generator', function () {
  it('can be imported without blowing up', function () {
    var app = require('../app');
    assert(app !== undefined);
  });
});
