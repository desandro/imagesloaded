QUnit.test( 'local files', function( assert ) {
  'use strict';

  var elem = document.querySelector('#locals');
  var done = assert.async( 6 );

  var imgLoader = new imagesLoaded( elem, function( obj ) {
    assert.ok( true, 'callback function triggered' );
    assert.equal( imgLoader, obj, 'callback argument and instance match' );
    done();
  });
  imgLoader.on( 'fail', function() {
    assert.ok( true, 'fail event triggered' );
    done();
  });
  imgLoader.on( 'always', function() {
    assert.ok( true, 'always event triggered' );
    done();
  });

  imgLoader.on( 'progress', function( loader, image ) {
    assert.ok( true, 'image progressed');
    if ( image.img.src.indexOf('img/not-there.jpg') !== -1 ) {
      assert.ok( !image.isLoaded, 'thunder cloud is not loaded' );
    } else {
      assert.ok( image.isLoaded, 'image is loaded' );
    }
    done();
  });

});
