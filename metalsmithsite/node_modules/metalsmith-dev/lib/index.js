var http = require("http");
var st = require("st");
var gaze = require("gaze");
var chalk = require("chalk");

var log = function (message) {
	console.log(chalk.grey("[metalsmith-dev] ") + message);
};

exports.watch = function (metalsmith, paths) {
	// Watch the Metalsmith source folder and any extra paths
	var watchedPaths = [metalsmith.source() + "/**/*"];
	if (paths) {
		watchedPaths = watchedPaths.concat(paths);
	}

	gaze(watchedPaths, function (err, watcher) {
		log("Watching for changes...");
		watcher.on("all", function (event, filePath) {
			log(event + ": " + filePath);
			// Rebuild everything
			// Inefficient, but neccessary if the change was inside a template
			// TODO: Inspect filePath and rebuild only required files?
			metalsmith.build(function(err) {
				if (err) {
					throw err;
				}
			});
		});
	});
};

exports.serve = function (metalsmith, port) {
	var port = port || 8080;

	var server = http.createServer(st({
		path: metalsmith.destination(),
		index: "index.html",
		passthrough: false, // Throw 404 errors if files aren't found
		cache: false // Disable cache for development
	})).listen(port);

	log("Serving on port " + port);
	return server;
};
