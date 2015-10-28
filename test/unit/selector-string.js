QUnit.test( 'selector string', function( assert ) {
  'use strict';
  var images = document.querySelectorAll('#basics img');
  var done = assert.async();
  var imgLoad = imagesLoaded('#basics', { debug: true }).on( 'done', function( obj ) {
    assert.ok( true, 'selector string worked' );
    assert.ok( obj.images, 'argument has images' );
    assert.equal( obj.images.length, images.length, 'images.length matches' );
    done();
  });
  assert.ok( imgLoad.options.debug, 'debug option set' );
});
