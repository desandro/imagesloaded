test( 'picture-element', function() {
  'use strict';

  stop();
  imagesLoaded('#picure-element', { debug: true }).on( 'done', function( obj ) {
    ok( true, 'picture element image loaded' );
    equal( obj.images.length, 1, 'instance has 1 image' );
    start();
  });
});
