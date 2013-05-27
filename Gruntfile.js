
// -------------------------- grunt -------------------------- //

module.exports = function( grunt ) {

  var bowerJSON = grunt.file.readJSON('bower.json');

  // get banner comment from draggabilly.js
  var banner = ( function() {
    var src = grunt.file.read('imagesloaded.js');
    var re = new RegExp('^\\s*(?:\\/\\*[\\s\\S]*?\\*\\/)\\s*');
    var matches = src.match( re );
    return matches[0].replace( 'imagesLoaded', 'imagesLoaded PACKAGED' );
  })();

  grunt.initConfig({

    concat: {
      pkgd: {
        // src will be set in package-sources task
        src: [ bowerJSON.main ],
        dest: 'imagesloaded.pkgd.js',
        options: {
          banner: banner
        }
      }
    },

    uglify: {
      pkgd: {
        files: {
          // 'build/imagesloaded.pkgd.min.js' will be set in bower-list-sources
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

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // load all tasks in tasks/
  grunt.loadTasks('tasks/');

  grunt.registerTask( 'default', [
    'bower-list-sources',
    'concat',
    'uglify',
    'page'
  ]);

};
