test( 'background image basics', function() {

  'use strict';

  var elem = document.querySelector('#background-image-basics');
  var imgLoader = new imagesLoaded( elem, { background: true });
  var progressCount = 0;
  stop();

  imgLoader.on( 'progress', function(instance, image) {
    progressCount++;
  });

  imgLoader.on( 'done', function() {
    equal( progressCount, 2, 'background-image and background loaded' );
    start();
  });

});
