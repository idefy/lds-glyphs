"use strict"

var fs = require('fs');
var path = require('path');
//var args = require('yargs').argv;
var del = require('del');
var browserSync = require('browser-sync');
var config = require('./gulp.config')();
var gulp = require('gulp');
var $ = require('gulp-load-plugins')({lazy: true});

var colors = $.util.colors;
var envenv = $.util.env;

/**
 * yargs variables can be passed in to alter the behavior, when present.
 * Example: gulp serve-dev
 *
 * --verbose  : Various tasks will produce more output to the console.
 * --nosync   : Don't launch the browser with browser-sync when serving code.
 * --debug    : Launch debugger with node-inspector.
 * --debug-brk: Launch debugger and break on 1st line with node-inspector.
 * --startServers: Will start servers for midway tests on the test task.
 */

/**
 * List the available gulp tasks
 */
gulp.task('help', $.taskListing);
gulp.task('default', ['help']);

/////////////// GLYPHS /////////////////////////

gulp.task('glyph', ['glyph_font','glyph_html', 'glyph_css']);

/**
 * Generates glyphs
 * TODO: generated the css based on the SVG file
 * revision NOT hashed
 */
gulp.task('glyph_font', function(cb){
	log('Creating LDS glyphs fonts');
	return gulp
	.src(config.glyphs + config.svg)
	.pipe($.plumber())
	.pipe($.svg2ttf())
	.pipe(gulp.dest(config.build))
	.pipe($.mirror(
		$.ttf2eot(),
		$.ttf2woff(),
		$.ttf2woff2()
	))
	.pipe(gulp.dest(config.build));
	if (cb) cb(null);

});

/**
 * Generates css for glyphs
 * TODO: generated the css based on the SVG file
 * revision NOT hashed
 */
gulp.task('glyph_css', ['glyph_json'], function(cb){
	log('Creating css glyphs file');
	return gulp
	.src(config.css)
	.pipe($.data(getJsonData))
	.pipe($.swig({defaults: { cache: false }}))
	.pipe($.rename({extname:'.css'}))
	.pipe(gulp.dest(config.build));
	if (cb) cb(null);

});

/**
 * Generates HTML sample for glyphs
 * TODO: generated the css based on the SVG file
 * revision NOT hashed
 */
gulp.task('glyph_html',['glyph_json'], function(cb){
	log('Creating sample html glyphs file');
	log(config.html);
	log(config.sample);
	return gulp
	.src(config.html)
	.pipe($.data(getJsonData))
	.pipe($.swig({defaults: { cache: false }}))
	.pipe(gulp.dest(config.sample));
	if (cb) cb(null);

});

/**
 * Obtains glyphs json data file glyphs
 */
gulp.task('glyph_json', function(cb){
	log('Creating json data for sample & css file');
	return gulp
	.src(config.glyphs + config.svg)
	.pipe($.rename({extname:'.xml'}))
	.pipe($.xml2json())
	.pipe($.rename({extname:'.json'}))
	.pipe(gulp.dest(config.temp));
	if (cb) cb(null);

});

gulp.task('serve', ['glyph'], function() {
	browserSync.init({
		startPath: './sample/sample.html',
        server: {
			baseDir: config.dist,
			routes: {
				
			}
		},
		injectChanges: true
    });
	
	gulp.watch(config.glyphs + '**/*.*', ['glyph']);
	gulp.watch(config.dist + 'sample/sample.html' ).on('change', browserSync.reload); //'**/*.*'
});

/**
 * Remove all files from the build, temp, and reports folders
 * @param  {Function} done - callback when complete
 */
gulp.task('clean', function() {
    var delconfig = [].concat(config.dist, config.temp);
    //log('Cleaning: ' + $.util.colors.blue(delconfig));
    del(delconfig);
});

/////////////// functions /////////////////////////

var getJsonData = function(file) {
  return require(config.jsonData);
};

/**
 * Log a message or series of messages using chalk's blue color.
 * Can pass in a string, object or array.
 */
function log(msg) {
    if (typeof(msg) === 'object') {
        for (var item in msg) {
            if (msg.hasOwnProperty(item)) {
                $.util.log($.util.colors.blue(msg[item]));
            }
        }
    } else {
        $.util.log($.util.colors.blue(msg));
    }
}

/**
 * Show OS level notification using node-notifier
 */
function notify(options) {
    var notifier = require('node-notifier');
    var notifyOptions = {
        sound: 'Bottle',
        contentImage: path.join(__dirname, 'gulp.png'),
        icon: path.join(__dirname, 'gulp.png')
    };
    _.assign(notifyOptions, options);
    notifier.notify(notifyOptions);
}

/**
 * Delete all files in a given path
 * @param  {Array}   path - array of paths to delete
 * @param  {Function} done - callback when complete
 */
function clean(path, done) {
    log('Cleaning: ' + $.util.colors.blue(path));
    del(path, done);
}

/**
 * Loops on folders
 */
function getFolders(dir) {
    return fs.readdirSync(dir)
      .filter(function(file) {
        return fs.statSync(path.join(dir, file)).isDirectory();
      });
}

function buildDetails() {
	var min = config.minify ? $.util.colors.bgYellow(true) : $.util.colors.yellow(false);
	var rev = config.hashRev ? $.util.colors.bgYellow(true) : $.util.colors.yellow(false);
	var build = config.isProd ? $.util.colors.bgYellow('Production') : $.util.colors.yellow('Development');
	$.util.log($.util.colors.yellow('Building for:    '), build);
	$.util.log($.util.colors.yellow('Minify libraries:'), min);
	$.util.log($.util.colors.yellow('Hash Revision:   '), rev);
}

module.exports = gulp;
