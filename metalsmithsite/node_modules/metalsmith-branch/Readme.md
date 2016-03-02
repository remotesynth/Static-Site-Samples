
# metalsmith-branch

  A [metalsmith][metalsmith] plugin to run separate middleware pipelines on 
  selected files.

  Facilitates 'declarative' pipelines by file pattern or filter, since it means
  each plugin doesn't have to implement its own filtering.  See examples below.

  *April 2014: Please bear in mind that this is 0.0.x software and use with
  caution, especially since metalsmith itself is likely to change.*


## Installation

    $ npm install metalsmith-branch


## Usage

  In your build file:
  
  ```js
  var branch = require('metalsmith-branch')

  metalsmith
    .use( branch()
            .pattern('*.md')        // for only md source files,
            .use( templates({       // run through swig template engine
                    engine: "swig",
                    inPlace: true
                  })
            )
            .use( markdown() )      // and generate html
        )

  // you can also specify the pattern directly in constructor

  metalsmith
    .use( branch('images/*') 
            .use( imageVariants() )
        )

  // or select files by function of their name, properties, and order:

  var lastweek = function(filename,props,i){
    var dt = new Date()
      , last = new Date( dt.getFullYear(), dt.getMonth(), dt.getDate());
    last.setDate( last.getDate() - 6 )
    return ( props.published >= last );
  }

  metalsmith
    .use( branch( lastweek )
            .use( tagLatest() )
        )
  ```

  Note that nested branches are possible too.

  ```js
  // to post-process only markdown-sourced files in a 'special' dir:

  metalsmith
    .use( branch('*.md')
            .use( markdown() )
            .use( branch('special/*.html')
                    .use( postProcess() )
                )
        )
  ```

## License

  MIT


[metalsmith]: https://github.com/segmentio/metalsmith

