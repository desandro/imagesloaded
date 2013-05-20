/**
 * creates page for the World Wide Webinars
**/


var highlightjs = require('highlight.js');
var marked = require('marked');

// alias XML syntax highlighting as HTML
highlightjs.LANGUAGES.html = highlightjs.LANGUAGES.xml;
// alias js as javascript
highlightjs.LANGUAGES.js = highlightjs.LANGUAGES.javascript;

marked.setOptions({
  highlight: function( code, lang ) {
    return lang ? highlightjs.highlight( lang, code ).value : code;
  }
});

module.exports = function( grunt ) {

  grunt.registerTask( 'page', function() {
    var readmeHTML = marked( grunt.file.read('README.md') );
    var page = grunt.file.read('assets/page.html');
    var content = page.replace( '{{{ content }}}', readmeHTML );

    grunt.file.write( 'index.html', content );
  });

};
