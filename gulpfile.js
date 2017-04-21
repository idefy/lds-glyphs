"use strict"

var fs = require('fs');
var path = require('path');
var args = require('yargs').argv;
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

/////////////// TASKS /////////////////////////

gulp.task('serve', ['glyph'], function() {
	browserSync.init({
		startPath: './sample.html',
        server: {
			baseDir: config.dist,
			routes: {
				
			}
		},
		injectChanges: true
    });
	
	gulp.watch(config.glyphs + '**/*.*', ['glyph']);
	gulp.watch(config.dist + 'sample.html' ).on('change', browserSync.reload); //'**/*.*'
});

gulp.task('glyph', function(){
	return gulp.src(['src/assets/*.svg'])
	  .pipe($.iconfont({
		  fontName:'LDS glyphs',
		  fileName:'lds-glyphs',
          appendUnicode: false,
          formats: ['ttf', 'eot', 'woff', 'svg', 'woff2']
	  }))
	  .on('glyphs', function(glyphs, options){
		  log('Generating glyphs\' css');
		  gulp.src('src/templates/lds-glyphs.css')
		    .pipe($.consolidate('lodash', {
				glyphs: glyphs,
				fontName: 'LDS glyphs',
				fileName: 'lds-glyphs',
				fontPath: '',
				className: 'ldsg'
			}))
			.pipe(gulp.dest('dist/glyphs/'));
		  log('Generating HTML');
		   gulp.src('src/templates/sample.html')
		    .pipe($.consolidate('lodash', {
				glyphs: glyphs,
				fontName: 'LDS glyphs',
				fileName: 'lds-glyphs',
				className: 'ldsg'
			}))
			.pipe(gulp.dest('dist/'));
	  })
	  .pipe(gulp.dest('dist/glyphs/'));
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

gulp.task('bump', function () {
    /// <summary>
    /// It bumps revisions
    /// Usage:
    /// 1. gulp bump : bumps the package.json and bower.json to the next minor revision.
    ///   i.e. from 0.1.1 to 0.1.2
    /// 2. gulp bump --version 1.1.1 : bumps/sets the package.json and bower.json to the 
    ///    specified revision.
    /// 3. gulp bump --type major       : bumps 1.0.0 
    ///    gulp bump --type minor       : bumps 0.1.0
    ///    gulp bump --type patch       : bumps 0.0.2
    ///    gulp bump --type prerelease  : bumps 0.0.1-2
    /// </summary>
	var msg = "";
    var type = args.type;
    var version = args.version;
    var options = {};

    if (version) {
        options.version = version;
        msg += ' to ' + version;
    } else {
        options.type = type;
		if(type) {
			msg += ' for a ' + type;
		} else {
			msg += ' for a patch'; 
		}
    }

    return gulp
        .src(['package.json', 'bower.json'])
		.pipe($.tap(function(file) {
			log("Bumping " + path.basename(file.path) + msg + ":");
		}))
        .pipe($.bump(options))
        .pipe(gulp.dest('.'));
});

/////////////// functions /////////////////////////

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

module.exports = gulp;
