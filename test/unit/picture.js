QUnit.test( 'picture', function( assert ) {

  let done = assert.async( 4 );

  let imgLoad0 = imagesLoaded( '#picture-list', function() {
    assert.ok( true, 'callback triggered on #picture-list' );
    done();
  } );
  assert.equal( imgLoad0.images.length, 3, '3 images on #picture-list' );

  imgLoad0.on( 'progress', function( instance, image, element ) {
    assert.ok( element.nodeName === 'PICTURE', 'progress; element is picture' );
    assert.ok( image.isLoaded, 'progress; image.isLoaded' );
    done();
  } );

} );
