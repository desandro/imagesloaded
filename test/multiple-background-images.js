test( 'multiple background images', function() {

  'use strict';

  var container = document.querySelector('#multiple-background-images');
  var elem = container.querySelector('.bg-image');
  var imgLoader = new imagesLoaded( container, { background: true });
  var progressCount = 0;
  var check = true;
  stop();

  imgLoader.on( 'progress', function(instance, image) {
    if ( check ) {
      equal( image.img.originalElement, elem, 'original element is correct' );
      check = false;
    }
    progressCount++;
  });

  imgLoader.on( 'done', function() {
    equal( progressCount, 2, 'multiple background-images loaded' );
    start();
  });

});
