/**
 * package sources
 * creates foo.pkgd.js
 * built with RequireJS
 */

var requirejs = require('requirejs');
var getPkgdBanner = require('./utils/get-pkgd-banner.js');

var config = {
  baseUrl: 'bower_components',
  include: [
    '../imagesloaded'
  ],
  out: 'imagesloaded.pkgd.js',
  optimize: 'none',
  wrap: {}
};

module.exports = function( grunt ) {

  config.wrap.start = getPkgdBanner( grunt );

  // create isotope.pkgd.js
  grunt.registerTask( 'package-sources', function() {
    var done = this.async();
    requirejs.optimize( config, function() {
      // remove module name
      var contents = grunt.file.read( config.out );
      contents = contents.replace( "'../imagesloaded',", '' );
      grunt.file.write( config.out, contents );
      grunt.log.writeln( 'File "' + config.out + '" created.' );
      done();
    }, function( err ) {
      grunt.log.error( err );
      done();
    });
  });

};
