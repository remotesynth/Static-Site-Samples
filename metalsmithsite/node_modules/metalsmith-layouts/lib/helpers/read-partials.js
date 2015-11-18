/**
 * Dependencies
 */
var path = require('path');
var read = require('fs-readdir-recursive');

/**
 * Expose `readPartials`
 */
module.exports = readPartials;

/**
 * Helper for reading a folder with partials, returns a `partials` object that
 * can be consumed by consolidate.
 *
 * @param {String} partialsRel
 * @param {String} layoutsRel
 * @param {Object} metalsmith
 * @return {Object}
 */
function readPartials(partialsRel, layoutsRel, metalsmith) {
  var partialsAbs = path.join(metalsmith.path(), partialsRel);
  var layoutsAbs = path.join(metalsmith.path(), layoutsRel);
  var files = read(partialsAbs);
  var partials = {};

  // Return early if there are no partials
  if (files.length === 0) {
    return partials;
  }

  // Read and process all partials
  for (var i = 0; i < files.length; i++) {
    var ext = path.extname(files[i]);
    var name = files[i].replace(ext, '');
    var partialAbs = path.join(partialsAbs, name);
    var partialPath = path.relative(layoutsAbs, partialAbs);

    partials[name] = partialPath;
  }

  return partials;
}
