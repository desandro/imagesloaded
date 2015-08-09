test( 'background image', function() {

  'use strict';

  var elem = document.querySelector('#background-image');
  var imgLoader = new imagesLoaded( elem, { background: true });
  var progressCount = 0;
  stop();

  imgLoader.on( 'progress', function(instance, image) {
    progressCount++;
  });

  imgLoader.on( 'done', function() {
    equal( progressCount, 1, 'background-image loaded' );
    start();
  });

});
