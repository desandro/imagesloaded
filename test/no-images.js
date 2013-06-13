test( 'no images', function() {

  'use strict';

  var elem = document.querySelector('#no-images');
  stop();
  imagesLoaded( elem, function() {
    ok( true, 'triggered with no images' );
    start();
  });

});
