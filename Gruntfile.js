
var getPkgdBanner = require('./tasks/utils/get-pkgd-banner.js');

// -------------------------- grunt -------------------------- //

module.exports = function( grunt ) {

  // get banner comment from draggabilly.js
  var banner = getPkgdBanner( grunt );

  grunt.initConfig({

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

    watch: {
      content: {
        files: [ 'assets/*', 'README.md' ],
        tasks: [ 'concat', 'page', 'copy' ]
      },
      js: {
        files: [ 'imagesloaded.js' ],
        tasks: [ 'concat', 'uglify' ]
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // load all tasks in tasks/
  grunt.loadTasks('tasks/');

  grunt.registerTask( 'default', [
    'package-sources',
    'uglify',
    'page'
  ]);

};
