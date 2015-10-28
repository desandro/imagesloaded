QUnit.test( 'no images', function( assert ) {
  'use strict';

  var elem = document.querySelector('#no-images');
  var done = assert.async();
  imagesLoaded( elem, function() {
    assert.ok( true, 'triggered with no images' );
    done();
  });

});
