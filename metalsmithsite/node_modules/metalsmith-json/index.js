var _ = require('lodash'),
    path = require('path');

module.exports = function(opts) {

    opts = _.extend({
        key: 'data'
    }, (opts || {}));

    return function(files, metalsmith, done) {
        _.each(files, function (file, key) {
            if (path.extname(key) === '.json') {
                file[opts.key] = JSON.parse(file.contents);
            }
        });
        done();
    };
};