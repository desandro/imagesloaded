QUnit.test( 'single element', function( assert ) {
  'use strict';
  var elem = document.querySelector('#mario-with-shell');
  var done = assert.async();
  imagesLoaded( elem ).on( 'done', function( obj ) {
    assert.ok( true, 'single element worked' );
    assert.ok( obj.images, 'argument has images' );
    assert.equal( obj.images.length, 1, 'images.length = 1' );
    done();
  });
});
