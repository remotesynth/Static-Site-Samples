var extend   = require('extend');
var extname  = require('path').extname;
var entities = require('ent');

/**
 * Support creating excerpts from basic html.
 *
 * @param  {Object}   maxLength
 * @return {Function}
 */
module.exports = function (opts) {
  opts = extend({
    suffix: '…',
    maxLength: 300
  }, opts);

  return function (files, metalsmith, done) {
    Object.keys(files).forEach(function (file) {
      var data = files[file];

      // Skip attaching a snippet if one has been defined already.
      if (data.snippet || !isHtml(file)) {
        return;
      }

      data.snippet = extractSnippet(data.contents.toString(), opts);
    });

    return done();
  };
};

/**
 * Extract a short snippet based on the file contents.
 *
 * @param  {String} contents
 * @param  {Object} opts
 * @return {String}
 */
function extractSnippet (contents, opts) {
  // Remove code sections, html tags and any additional whitespace.
  contents = entities.decode(contents)
    .replace(/<pre[^>]*>[\s\S]*?<\/pre>/g, '')
    .replace(/<[^>]+>/g, '')
    .replace(/\s+/, ' ')
    .trim();

  // If the total contents length is already shorted, return.
  if (contents.length < opts.maxLength) {
    return entities.encode(contents);
  }

  // Find the last whitespace break before the maximum length.
  var nonWordIndex = contents.substr(0, opts.maxLength + 1).lastIndexOf(' ');

  // A non-word index could not be found within the `maxLength`, return nothing.
  if (nonWordIndex === -1) {
    return '';
  }

  // Extract the string using the maximum number of words within the length. We
  // also trim trailing punctuation characters.
  contents = contents.substr(0, nonWordIndex).replace(/[,\.!?;]+$/, '');

  return entities.encode(contents + opts.suffix);
}

/**
 * Check whether the file is html.
 *
 * @param  {String}  file
 * @return {Boolean}
 */
function isHtml (file) {
  return extname(file) === '.html';
}
