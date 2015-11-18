var Metalsmith  = require('metalsmith'),
    dev         = require("metalsmith-dev"),
    branch      = require('metalsmith-branch'),
    markdown    = require('metalsmith-markdown'),
    layouts     = require('metalsmith-layouts'),
    collections = require('metalsmith-collections'),
    permalinks  = require('metalsmith-permalinks'),
    feed        = require('metalsmith-feed'),
    json        = require('metalsmith-json'),
    // snippet     = require('metalsmith-snippet')
    extname     = require('path').extname,
    Jade        = require('jade'),
    _           = require('underscore'),
    moment      = require('moment'),
    typogr      = require('typogr'),
    async       = require('async');

var ms = Metalsmith(__dirname)
    .metadata({
        site: {
            "url": "http://localhost:8080",
            "title": "Adventure Time!",
            "owner": "Brian Rinaldi",
            "description": "Adventure Time is an American animated television series created by Pendleton Ward for Cartoon Network. The series follows the adventures of Finn, a human boy, and his best friend and adoptive brother Jake, a dog with magical powers to change shape and grow and shrink at will. Finn and Jake live in the post-apocalyptic Land of Ooo. Along the way, they interact with the other main characters of the show: Princess Bubblegum, The Ice King, and Marceline the Vampire Queen.",
            "banner": "/assets/images/about.jpg"
        },
        moment: moment,
        _: _,
        typogr: typogr
    })
    .use(collections({
        articles: {
            pattern: 'articles/**/*.md'
        },
        characters: {
            pattern: 'characters/*.json'
        }
    }))
    .use(markdown({
        "smartLists": true,
        "smartypants": true
    }))
    .use(json({
        key: 'json'
    }))
    .use(feed({
        collection: 'articles',
        destination: 'feed.xml'
    }))
    // Articles Branch
    .use(
        branch('articles/**/*.html')
            // Custom snippet plugin
            // ---------------------
            // This plugin is replicating Wintersmith's "intro" field, and will hopefully
            // be replaced by an enhancement of metalsmith-snippet soon
            .use(function (files, metalsmith, done) {
                Object.keys(files).forEach(function (file) {
                    var data = files[file];

                    // Skip attaching a snippet if one has been defined already.
                    if (data.snippet || extname(file) !== '.html') {
                        return;
                    }

                    // Add the snippet to the file
                    data.snippet = function(contents){
                        contents = contents.trim();

                        var idx = Infinity;
                        // Find the earliest stopping point
                        ['<span class="more', '<h2', '<hr'].forEach(function (stop) {
                            var i = contents.indexOf(stop);
                            if (i !== -1 && i < idx) {
                                idx = i;
                            }
                        });

                        return idx !== Infinity ? contents.substr(0, idx) : contents;
                    }(data.contents.toString());
                });

                return done();
            })
            .use(layouts({
                engine: 'jade',
                pretty: true,
                directory: 'templates',
                partials: 'templates/partials',
                default: 'article.jade'
            }))
            .use(permalinks({
                pattern: ':collection/:title'
            }))
    )
    // Index.html Branch
    .use(
        branch('*.html')
            .use(layouts({
                engine: 'jade',
                pretty: true,
                directory: 'templates',
                partials: 'templates/partials',
                default: 'index.jade'
            }))
    )
    .destination('./build');

    // Serve
    dev.watch(ms);
    var server;
    async.waterfall([
        function(callback){
            server = dev.serve(ms);
        }
    ], function(error){
        if (error){
            console.log(error.message, error);
            server.close();
            process.exit(1);
        }
    });

    // Build
    ms.build(function(err, files){
        if (err) {
            console.log(err);
        }
        else {
            console.log('Site build complete!');
        }
    });
