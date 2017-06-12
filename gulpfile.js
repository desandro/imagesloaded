/*jshint node: true, strict: false */

var fs = require('fs');
var gulp = require('gulp');
var rename = require('gulp-rename');
var replace = require('gulp-replace');

// ----- hint ----- //

var jshint = require('gulp-jshint');

gulp.task( 'hint-js', function() {
  return gulp.src('imagesloaded.js')
    .pipe( jshint() )
    .pipe( jshint.reporter('default') );
});

gulp.task( 'hint-test', function() {
  return gulp.src('test/unit/*.js')
    .pipe( jshint() )
    .pipe( jshint.reporter('default') );
});

gulp.task( 'hint-task', function() {
  return gulp.src('gulpfile.js')
    .pipe( jshint() )
    .pipe( jshint.reporter('default') );
});

var jsonlint = require('gulp-json-lint');

gulp.task( 'jsonlint', function() {
  return gulp.src( '*.json' )
    .pipe( jsonlint() )
    .pipe( jsonlint.report('verbose') );
}); 

gulp.task( 'hint', [ 'hint-js', 'hint-test', 'hint-task', 'jsonlint' ]);

// -------------------------- RequireJS makes pkgd -------------------------- //

// refactored from gulp-requirejs-optimize
// https://www.npmjs.com/package/gulp-requirejs-optimize/

var gutil = require('gulp-util');
var chalk = require('chalk');
var rjsOptimize = require('gulp-requirejs-optimize');

// regex for banner comment
var reBannerComment = new RegExp('^\\s*(?:\\/\\*[\\s\\S]*?\\*\\/)\\s*');

function getBanner() {
  var src = fs.readFileSync( 'imagesloaded.js', 'utf8' );
  var matches = src.match( reBannerComment );
  var banner = matches[0].replace( 'imagesLoaded', 'imagesLoaded PACKAGED' );
  return banner;
}

function addBanner( str ) {
  return replace( /^/, str );
}

gulp.task( 'requirejs', function() {
  var banner = getBanner();
  // HACK src is not needed
  // should refactor rjsOptimize to produce src
  return gulp.src('imagesloaded.js')
    .pipe( rjsOptimize({
      baseUrl: 'bower_components',
      optimize: 'none',
      include: [
        '../imagesloaded'
      ]
    }) )
    // remove named module
    .pipe( replace( "'../imagesloaded',", '' ) )
    // add banner
    .pipe( addBanner( banner ) )
    .pipe( rename('imagesloaded.pkgd.js') )
    .pipe( gulp.dest('.') );
});


// ----- uglify ----- //

var uglify = require('gulp-uglify');

gulp.task( 'uglify', [ 'requirejs' ], function() {
  var banner = getBanner();
  gulp.src('imagesloaded.pkgd.js')
    .pipe( uglify() )
    // add banner
    .pipe( addBanner( banner ) )
    .pipe( rename('imagesloaded.pkgd.min.js') )
    .pipe( gulp.dest('.') );
});

// ----- version ----- //

// set version in source files

var minimist = require('minimist');

// use gulp version -t 1.2.3
gulp.task( 'version', function() {
  var args = minimist( process.argv.slice(3) );
  var version = args.t;
  if ( !version || !/\d+\.\d+\.\d+/.test( version ) ) {
    gutil.log( 'invalid version: ' + chalk.red( version ) );
    return;
  }
  gutil.log( 'ticking version to ' + chalk.green( version ) );

  gulp.src('imagesloaded.js')
    .pipe( replace( /imagesLoaded v\d+\.\d+\.\d+/, 'imagesLoaded v' + version ) )
    .pipe( gulp.dest('.') );

  gulp.src( [ 'bower.json', 'package.json' ] )
    .pipe( replace( /"version": "\d+\.\d+\.\d+"/, '"version": "' + version + '"' ) )
    .pipe( gulp.dest('.') );
});

// ----- default ----- //

gulp.task( 'default', [
  'hint',
  'uglify'
]);
