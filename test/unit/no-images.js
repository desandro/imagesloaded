QUnit.test( 'no images', function( assert ) {
  let elem = document.querySelector('#no-images');
  let done = assert.async();
  imagesLoaded( elem, function() {
    assert.ok( true, 'triggered with no images' );
    done();
  } );

} );
