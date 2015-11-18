
/**
 * Module dependencies.
 */

var thunk = require('thunkify');
var fse = require('fs-extra');
var cofs = require('co-fs');

/**
 * co-fs methods to exports.
 */
var cofsMethods = [
  'rename',
  'ftruncate',
  'chown',
  'fchown',
  'lchown',
  'chmod',
  'fchmod',
  'stat',
  'lstat',
  'fstat',
  'link',
  'symlink',
  'readlink',
  'realpath',
  'unlink',
  'rmdir',
  'mkdir',
  'readdir',
  'close',
  'open',
  'utimes',
  'futimes',
  'fsync',
  'write',
  'read',
  'readFile',
  'writeFile',
  'appendFile',
  'exists',
  'createReadStream'
];

cofsMethods.forEach(function (name) {
  exports[name] = cofs[name] || null;
});

/**
 * fs-extra methods to wrap.
 */
var fseMethods = [
  'copy',
  'ensureFile',
  'ensureDir',
  'mkdirs',
  'move',
  'outputFile',
  'outputJson',
  'readJson',
  'remove',
  'writeJson'
];

fseMethods.forEach(function (name) {
  if (!fse[name]) return;
  exports[name] = thunk(fse[name]);
});