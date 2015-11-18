# Metalsmith Dev

Simple development helpers for [Metalsmith][1].

## Install

```
npm install metalsmith-dev
```

## Example

```
var Metalsmith = require("metalsmith");
var markdown = require("metalsmith-markdown");
var templates = require("metalsmith-templates");
var dev = require("metalsmith-dev");

var site = Metalsmith(__dirname)
  .use(markdown())
  .use(templates('handlebars'))
  .build(function(err) {
    if (err) throw err;
  });

dev.watch(site);
dev.serve(site);
```

For a more complete example, check out the [build script for my personal site][2].

## API

### watch(metalsmith, paths)

Watches the Metalsmith source folder for changes and rebuilds.

Arguments:

* metalsmith: An instance of Metalsmith.
* paths: A string or array of strings to be watched along with the source folder. Optional.

### serve(metalsmith, port)

Statically serves the Metalsmith destination folder.

Arguments:

* metalsmith: An instance of Metalsmith.
* port: Port from which to serve site. Optional, defaults to 8080.

## License

The MIT License (MIT)

Copyright © 2014, Geoff Blair

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

[1]: http://www.metalsmith.io/
[2]: https://github.com/geoffb/www.geoffblair.com/blob/master/build.js
