test( 'data-uri', function() {
  'use strict';

  stop();
  imagesLoaded('#data-uri', { debug: true }).on( 'done', function( obj ) {
    ok( true, 'data-uri images loaded' );
    equal( obj.images.length, 2, 'instance has 2 images' );
    start();
  });
});
