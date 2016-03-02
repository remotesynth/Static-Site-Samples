var msj = require('../../index.js');

var content1 = {
    'spam': 'eggs'
};

var getTestFiles = function () {
    return {
        'foo.json': {
            contents: JSON.stringify(content1)
        },
        'foo.txt': {
            contents: JSON.stringify({
                'junk': 'things'
            })
        }
    };
};

var files;

beforeEach(function() {
    files = getTestFiles();
});

describe("metalsmith-json", function () {

    it('Should iterate a file collection and parse json into a data property on the file object', function () {
        (msj()(files, null, function(){}));
        expect(files['foo.json'].data).toEqual(content1);
        expect(files['foo.txt'].data).toBeFalsy();
    });

    it('Should store data under a configurable key', function() {
        (msj({key: 'bar'})(files, null, function(){}));
        expect(files['foo.json'].bar).toEqual(content1);
    });
});