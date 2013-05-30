/**
 * bower-list-map task
 */

var spawn = require('child_process').spawn;

module.exports = function( grunt ) {

  'use strict';

  grunt.registerTask( 'bower-list-sources', function() {
    var _ = grunt.util._;
    var done = this.async();
    var jsRe = /\.js$/i

    var extractPath = function(files) {
      var path;
      if (_.isString(files)) {
        path = files;
      } else {
        path = _.filter(files, function(el) { return jsRe.test(el); })[0];
      }
      if (path) {
        return path.replace(jsRe, '');
      }
    }

    // get map JSON from bower list --map
    var childProc = spawn('bower', 'list --map'.split(' ') );
    var sourcesSrc = '';
    childProc.stdout.setEncoding('utf8');
    childProc.stdout.on('data',  function( data ) {
      sourcesSrc += data;
    });

    childProc.on('close', function() {
      var bowerSources = JSON.parse( sourcesSrc );
      var paths = {};

      // Build the paths dict from the bower config.
      _.each(bowerSources, function(value, key) {
        var path = extractPath(value.source.main || value.source.scripts);
        if (path) {
          paths[key] = path;
        }
      });

      // Set config so requirejs can find the bower dependencies
      grunt.config.set( 'requirejs.pkgd.options.paths', paths );

      // Tell the uglify command what file to uglify.
      grunt.config.set( 'uglify.pkgd.files', {
        'imagesloaded.pkgd.min.js': [grunt.config.get('requirejs.pkgd.options.out')]
      });

      done();
    });

  });

};
