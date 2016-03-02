var assert = require('assert');
var equal = require('assert-dir-equal');
var path  = require('path');
var clone = require('clone');
var each = require('async').each;
var Metalsmith = require('metalsmith');
var markdown = require('metalsmith-markdown');
var debug = require('debug')('metalsmith-branch-test');
var branch = require('..');

describe('metalsmith-branch', function(){

  function assertDirEqual(fix,done){
    return function(err){
      if (err) return done(err);
      equal('test/fixtures/' + fix + '/expected', 'test/fixtures/' + fix + '/build');
      done();
    };
  }

  it('should process files selected by pattern, according to branch', function(done){
    Metalsmith('test/fixtures/basic')
      .use( branch()
              .pattern('*.md')
              .use( markdown() )
          )
      .build( assertDirEqual('basic',done) )
  });


  it('should process files selected by pattern passed into constructor, according to branch', function(done){
    Metalsmith('test/fixtures/basic')
      .use( branch('*.md')
              .use( markdown() )
          )
      .build( assertDirEqual('basic',done) )
  });


  it('branch pipelines should be able to add, update, and remove files', function(done){
    
    function adder(files,ms,done){
      function add(name,done){
        var newf = path.basename(name, path.extname(name)) + '.2' + path.extname(name);
        files[newf] = clone(files[name]);
        done();
      }
      each(Object.keys(files), add, done);
    }

    function updater(files,ms,done){
      function update(name,done){
        var old = files[name].contents.toString().trim();
        files[name].contents = new Buffer(
          '<html><head></head><body>' + 
          old + 
          '</body></html>'
        );
        done();
      }
      each(Object.keys(files), update, done);
    }

    function remover(files,ms,done){
      function remove(name,done){
        delete files[name];
        done();
      }
      each(Object.keys(files), remove, done);
    }
   
    Metalsmith('test/fixtures/mutate')
      .use( branch('add.*'   ).use( adder ) )
      .use( branch('update.*').use( updater ) )
      .use( branch('remove.*').use( remover ) )
    .build( assertDirEqual('mutate',done) )
  });


  // TODO
  
  it('should process selected files through three plugins in a branch', function(done){
    function adder(files,ms,done){
      function add(name,done){
        var newf = path.basename(name, path.extname(name)) + '.2' + path.extname(name);
        files[newf] = clone(files[name]);
        done();
      }
      debug('adder');
      each(Object.keys(files), add, done);
    }

    function updater(files,ms,done){
      function update(name,done){
        var old = files[name].contents.toString().trim();
        files[name].contents = new Buffer(
          '<html><head></head><body>' + 
          old + 
          '</body></html>'
        );
        done();
      }
      debug('updater');
      each(Object.keys(files), update, done);
    }

    function remover(files,ms,done){
      function remove(name,done){
        delete files[name];
        done();
      }
      debug('remover');
      each(Object.keys(files), remove, done);
    }

    Metalsmith('test/fixtures/multiplugin')
      .use( branch('*.txt')
              .use( adder   ) 
              .use( updater ) 
              .use( remover ) 
          )
    .build( assertDirEqual('multiplugin',done) )
  })
  
  it('should process files according to two branches, branch selections do not intersect')

  it('should process files according to two branches, branch selections intersect')

  it('should process files according to nested branches', function(done){
   
   function hasLicense(file,props){
     return props.license && props.author
   }
   
   function appendLicense(files,ms,done){
     function append(file,done){
       var str = [
         "",
         "-----",
         "Licensed " + files[file].license + " by " + files[file].author,
       ].join("\n");
       var contents = files[file].contents
         , len = contents.length
       contents.length = len + str.length
       contents.write(str,len);
       done();
     }
     debug('appendLicense');
     each(Object.keys(files), append, done);
   }

   Metalsmith('test/fixtures/nested')
     .use( branch('*.md')
             .use( branch( hasLicense )
                     .use( appendLicense )
                 )
             .use( markdown() )
         )
     .build( assertDirEqual('nested', done) );
  })


});


