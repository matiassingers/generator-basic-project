'use strict';

var path = require('path');
var helpers = require('yeoman-generator').test;

describe('basic project generator', function () {
  beforeEach(function (done) {
    helpers.run(path.join( __dirname, '../app'))
      .inDir(path.join( __dirname, './tmp'))
      .on('end', done);
  });

  it('creates expected default files', function () {
    var expected = [
      '.gitignore',
      '.editorconfig',
      'readme.md',
      'license',
    ];

    helpers.assertFile(expected);
  });
});
