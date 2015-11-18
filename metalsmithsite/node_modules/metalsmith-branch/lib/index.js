'use strict';

var Ware = require('ware')
var match = require('multimatch')
var debug = require('debug')('metalsmith-branch')
var clone = require('clone')
var has = hasOwnProperty

/**
 * Metalsmith plugin to run separate middleware pipelines on selected files.
 *
 * @param {String or Object or Function} filter
 * @return {Function}
 *
 * Example:
 *
 *   metalsmith(__dirname)
 *     .use( branch()
 *             .pattern('*.md')      // for only md source files,
 *             .use( markdown() )    // generate html
 *         )
 *     .use( branch('images/*')        // you can specify pattern or filter in constructor
 *             .use( imageVariants() )
 *         )
 *     .build()
 *
 * Nested branches are possible too:
 *
 *   metalsmith(__dirname)
 *     .use( branch('*.md')
 *             .use( markdown() )
 *             .use( branch('special/*.html')  // post-process markdown files in 'special' dir
 *                     .use( postProcess() )
 *                 )
 *         )
 *     .build()
 *
 */
module.exports = function plugin(matcher){
    
  var files, root;
  var filter = function(){ return true; };
  var ware = new Ware();

  branch.use = function(fn){
    ware.use(fn);
    return this;
  }

  branch.filter = function(fn){
    filter = fn;
    return this;
  }
  
  branch.pattern = function(pattern){
    debug('pattern: ' + pattern);
    return this.filter( function(file){
      return !!match(file,pattern)[0];
    });
  }

  /**
   * Run filtered set of files through branch pipeline
   * and mutate root (metalsmith) files afterwards.
   *
   * Note also that root is injected.
   * That way, you can mutate the metadata directly in middleware
   *
   * Note also `done` callback is passed in from root.
   *
   */
  function run(fn){
    var selected = filterObject(files, filter)
    var keys = Object.keys(selected)
    
    debug("selected files: " + Object.keys(selected).join(", "));
    
    ware.run(selected,root,function(err){
      if (err) return fn(err);
      fullMerge(files,selected,keys);
      debug("files after branch processed: " + Object.keys(files).join(", "));
      fn();
    });
  }

  /**
   * Function called by root (metalsmith) pipeline
   *
   */
  function branch(f,metalsmith,done){
    files = f; root = metalsmith;
    if (matcher == undefined){
    } else if (typeof matcher == "function"){
      branch.filter(matcher);
    } else {
      branch.pattern(matcher);
    }
    run(done);
  }
  
  return branch;

}


// utils

 
function filterObject( obj, filt ){
  var ret = {}, i = -1
  for (var k in obj){
    i = i + 1;
    if (has.call(obj,k)){
      if (filt(k,obj[k],i)) ret[k] = obj[k];
    }
  }
  return ret;
}

function fullMerge( obj, selected, keys){
  keys = keys || [];

  // add new and replace modified
  for (var k in selected){
    if (has.call(selected,k)) obj[k] = selected[k];
  };
  
  // delete deleted
  for (var i=0;i<keys.length;++i){
    var k = keys[i];
    if (!(has.call(selected,k))) delete obj[k];
  };

}

