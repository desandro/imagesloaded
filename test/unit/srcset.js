QUnit.test( 'srcset', function( assert ) {

  let done = assert.async( 4 );

  let imgLoad0 = imagesLoaded( '#srcset', function() {
    assert.ok( true, 'callback triggered on #srcset' );
    done();
  } );
  assert.equal( imgLoad0.images.length, 3, '3 images on #srcset' );

  imgLoad0.on( 'progress', function( instance, image, element ) {
    assert.ok( element.nodeName === 'IMG', 'progress; element is img' );
    assert.ok( image.isLoaded, 'progress; image.isLoaded' );
    done();
  } );

} );
