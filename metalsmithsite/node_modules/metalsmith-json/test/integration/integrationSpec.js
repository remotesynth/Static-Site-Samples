var fs = require('fs');
var grunt = require('grunt');

describe('metalsmith-json plugin', function() {
    //does not actually run metalsmith, just checks the output.
    it('should produce appropriate html output given the test config in the test dir', function() {
        var actual = grunt.file.read('test/output/index.html');
        var expected = grunt.file.read('test/integration/expected/index.html');
        expect(actual).toEqual(expected);
    });
});