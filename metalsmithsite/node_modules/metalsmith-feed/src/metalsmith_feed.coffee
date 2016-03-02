module.exports = (options={}) ->
  RSS = require 'rss'
  extend = require 'extend'
  url = require 'url'

  limit = options.limit or 20
  destination = options.destination or 'rss.xml'
  collectionName = options.collection
  postDescription = options.postDescription or (file) ->
    file.less or file.excerpt or file.contents
  postCustomElements = options.postCustomElements

  unless collectionName
    throw new Error 'collection option is required'

  (files, metalsmith, done) ->
    metadata = metalsmith.metadata()

    unless metadata.collections
      return done new Error 'no collections configured - see metalsmith-collections'

    collection = metadata.collections[collectionName]

    feedOptions = extend {}, metadata.site, options,
      site_url: metadata.site?.url
      generator: 'metalsmith-feed'

    siteUrl = feedOptions.site_url
    unless siteUrl
      return done new Error 'either site_url or metadata.site.url must be configured'

    feedOptions.feed_url ?= url.resolve siteUrl, destination

    feed = new RSS feedOptions
    if limit
      collection = collection[...limit]
    for file in collection
      itemData = extend {}, file,
        description: postDescription(file)
      if postCustomElements
        itemData.custom_elements = postCustomElements(file)
      if not itemData.url and itemData.path
        itemData.url = url.resolve siteUrl, file.path
      feed.item itemData

    files[destination] = contents: new Buffer feed.xml(), 'utf8'
    done()
