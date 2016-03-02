metalsmith-feed [![NPM version](https://badge.fury.io/js/metalsmith-feed.png)](http://badge.fury.io/js/metalsmith-feed) [![Build Status](https://travis-ci.org/hurrymaplelad/metalsmith-feed.png)](https://travis-ci.org/hurrymaplelad/metalsmith-feed)
==============

A [metalsmith](https://github.com/segmentio/metalsmith) plugin to generate an RSS feed for a collection.

Requires [metalsmith-collections](https://github.com/segmentio/metalsmith-collections).  Plays nicely with [permalinks](https://github.com/segmentio/metalsmith-permalinks), [more](https://github.com/kfranqueiro/metalsmith-more), and [excerpts](https://github.com/segmentio/metalsmith-excerpts).

Usage
-----
``` coffee
collections = require 'metalsmith-collections'
feed = require 'metalsmith-feed'

Metalsmith('example')
  .metadata
    site:
      title: 'Geocities'
      url: 'http://example.com'
      author: 'Philodemus'
  .use collections(posts: '*.html')
  .use feed(collection: 'posts')
```

Options
-------
Take a look at the tests for [example usage](test/metalsmith_feed.test.coffee).

- `collection` **string** *Required*. The name of the configured metalsmith-collection to feed.

- `limit` **Number** *Optional*. Maximum number of documents to show in the feed. Defaults to `20`. Set to `false` to include all documents.

- `destination` **string** *Optional*. File path to write the rendered XML feed. Defaults to `'rss.xml'`.

- `postDescription` **function** *Optional*. Takes a file and returns a description string.  Defaults to `(file) -> file.less or file.excerpt or file.contents`

- `postCustomElements` **function** *Optional*. From a file, return custom elements, like thumbnails, images, or information necessary to publish podcasts.

Remaining options are passed to the [rss](https://github.com/dylang/node-rss) module as `feedOptions`, along with `metadata.site`.

If files have `path` metadata (perhaps from [permalinks](https://github.com/segmentio/metalsmith-permalinks)) but not `url` metadata, we'll prefix `path` with `site_url` to generate links. Feed item descriptions default to `file.less` from metalsmith-more, `file.excerpt` from metalsmith-excerpt, and finally the full `file.contents`.
