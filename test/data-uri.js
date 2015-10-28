QUnit.test( 'data-uri', function( assert ) {
  'use strict';

  var done = assert.async();
  imagesLoaded('#data-uri', { debug: false }).on( 'done', function( obj ) {
    assert.ok( true, 'data-uri images loaded' );
    assert.equal( obj.images.length, 2, 'instance has 2 images' );
    done();
  });
});
