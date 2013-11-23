
module.exports = function( grunt ) {

  // get banner comment from imagesloaded.js
  var contents = grunt.file.read('imagesloaded.js');
  var re = new RegExp('^\\s*(?:\\/\\*[\\s\\S]*?\\*\\/)\\s*');
  var matches = contents.match( re );
  return matches[0].replace( 'imagesLoaded', 'imagesLoaded PACKAGED' );
};
