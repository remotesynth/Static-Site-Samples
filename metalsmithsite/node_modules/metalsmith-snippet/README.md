# Metalsmith Snippet

[![NPM version][npm-image]][npm-url]
[![Build status][travis-image]][travis-url]
[![Test coverage][coveralls-image]][coveralls-url]
[![Gittip][gittip-image]][gittip-url]

A [Metalsmith](http://metalsmith.io/) plugin for extracting snippets from files.

## Installation

```sh
npm install metalsmith-snippet --save
```

## Usage

### CLI

Install via npm and then add `metalsmith-snippet` to your `metalsmith.json`:

```json
{
  "plugins": {
    "metalsmith-snippet": {
      "maxLength": 300,
      "suffix": "..."
    }
  }
}
```

### JavaScript

```js
var snippet = require('metalsmith-snippet');

metalsmith.use(snippet({
  maxLength: 250,
  suffix: '...'
}));
```

## License

MIT

[npm-image]: https://img.shields.io/npm/v/metalsmith-snippet.svg?style=flat
[npm-url]: https://npmjs.org/package/metalsmith-snippet
[travis-image]: https://img.shields.io/travis/blakeembrey/metalsmith-snippet.svg?style=flat
[travis-url]: https://travis-ci.org/blakeembrey/metalsmith-snippet
[coveralls-image]: https://img.shields.io/coveralls/blakeembrey/metalsmith-snippet.svg?style=flat
[coveralls-url]: https://coveralls.io/r/blakeembrey/metalsmith-snippet?branch=master
[gittip-image]: https://img.shields.io/gittip/blakeembrey.svg?style=flat
[gittip-url]: https://www.gittip.com/blakeembrey
