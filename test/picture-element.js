test( 'picture-element', function() {
  'use strict';

  stop();
  imagesLoaded('#picure-element', { debug: true }).on( 'done', function( obj ) {
    ok( true, 'picture element image loaded' );
    equal( obj.images.length, 2, 'instance has 2 images' );
    start();
  });
});
