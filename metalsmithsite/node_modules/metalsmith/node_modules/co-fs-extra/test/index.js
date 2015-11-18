var co = require('co');
var fs = require('..');
var assert = require('assert');

describe('co-fs methods', function () {
  it('should be exports', function (done) {
    co(function* () {
      var ret = yield fs.exists('test/fixtures/msg.json');
      assert(true === ret);
    })(done);
  });
});

describe('fs-extra methods', function () {
  it('should be wrapped', function (done) {
    co(function* () {
      var data = yield fs.readJson('test/fixtures/msg.json');
      assert('hello' === data.msg);
    })(done);
  });
});