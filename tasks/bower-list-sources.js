/**
 * bower-list-map task
 */

var spawn = require('child_process').spawn;

module.exports = function( grunt ) {

  'use strict';

  grunt.registerTask( 'bower-list-sources', function() {
    var done = this.async();

    // get map JSON from bower list --map
    var childProc = spawn('bower', 'list --sources'.split(' ') );
    var sourcesSrc = '';
    childProc.stdout.setEncoding('utf8');
    childProc.stdout.on('data',  function( data ) {
      sourcesSrc += data;
    });

    childProc.on('close', function() {
      var bowerSources = JSON.parse( sourcesSrc );
      // set bowerMap

      // remove EventEmitter.min.js
      var bowerJsSources = bowerSources['.js'].filter( function( src ) {
        return src.indexOf('.min.js') === -1;
      });
      // add bower JS to JS collection
      var jsSrcs = grunt.config.get('concat.pkgd.src');
      jsSrcs = bowerJsSources.concat( jsSrcs );

      // set config so it gets concat and uglified
      grunt.config.set( 'concat.pkgd.src', jsSrcs );
      grunt.config.set( 'uglify.pkgd.files', {
        'imagesloaded.pkgd.min.js': jsSrcs
      });

      done();
    });

  });

};
