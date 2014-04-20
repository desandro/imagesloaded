
// -------------------------- grunt -------------------------- //

module.exports = function( grunt ) {

  // get banner comment from imagesloaded.js
  var banner = ( function() {
    var contents = grunt.file.read('imagesloaded.js');
    var re = new RegExp('^\\s*(?:\\/\\*[\\s\\S]*?\\*\\/)\\s*');
    var matches = contents.match( re );
    return matches[0].replace( 'imagesLoaded', 'imagesLoaded PACKAGED' );
  })();

  grunt.initConfig({

    requirejs: {
      // create imagesloaded.pkgd.js
      pkgd: {
        options: {
          baseUrl: 'bower_components',
          include: [
            '../imagesloaded'
          ],
          out: 'imagesloaded.pkgd.js',
          optimize: 'none',
          wrap: {
            start: banner
          }
        }
      }
    },

    uglify: {
      pkgd: {
        files: {
          'imagesloaded.pkgd.min.js': [ 'imagesloaded.pkgd.js' ]
        },
        options: {
          banner: banner
        }
      }
    },

  });

  grunt.loadNpmTasks('grunt-requirejs');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask( 'remove-pkgd-module-name', function() {
    var contents = grunt.file.read('imagesloaded.pkgd.js');
    contents = contents.replace( "'../imagesloaded',", '' );
    grunt.file.write( 'imagesloaded.pkgd.js', contents );
    grunt.log.writeln('Removed pkgd module name on imagesloaded.pkgd.js');
  });

  grunt.registerTask( 'default', [
    'requirejs',
    'remove-pkgd-module-name',
    'uglify'
  ]);

};
