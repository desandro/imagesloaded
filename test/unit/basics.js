QUnit.test( 'basics', function( assert ) {
  let elem = document.querySelector('#basics');
  let images = elem.querySelectorAll('img');
  let done = assert.async( 3 + images.length );

  let imgLoader = new imagesLoaded( elem, function( obj ) {
    assert.ok( true, 'callback function triggered' );
    assert.equal( imgLoader, obj, 'callback argument and instance match' );
    done();
  } );
  imgLoader.on( 'done', function() {
    assert.ok( true, 'done event triggered' );
    done();
  } );
  imgLoader.on( 'always', function() {
    assert.ok( true, 'always event triggered' );
    done();
  } );

  imgLoader.on( 'progress', function( loader, image ) {
    assert.ok( image.isLoaded, 'image is loaded' );
    done();
  } );

} );
