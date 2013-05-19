test( 'jquery success', function() {

  'use strict';

  var $ = window.jQuery;
  var isCallbacked, isDone, isAlways, isAllProgressed;
  var progressCount = 0;
  stop();

  $('#jquery-success').imagesLoaded( function( instance ) {
      ok( true, 'callback triggered' );
      ok( instance instanceof ImagesLoaded, 'instance instanceof ImagesLoaded' );
      isCallbacked = true;
      checkReady();
    })
    .done( function( instance ) {
      ok( true, 'done triggered' );
      ok( instance instanceof ImagesLoaded, 'instance instanceof ImagesLoaded' );
      isDone = true;
      checkReady();
    })
    .always( function( instance ) {
      ok( true, 'always triggered' );
      ok( instance instanceof ImagesLoaded, 'instance instanceof ImagesLoaded' );
      isAlways = true;
      checkReady();
    })
    .progress( function( instance, image ) {
      ok( image.isLoaded, 'image is loaded');
      progressCount++;
      if ( progressCount >= 3 ) {
        equal( progressCount, 3, 'progressed 3 times' );
        isAllProgressed = true;
        checkReady();
      }
    });

  function checkReady() {
    if ( isCallbacked && isDone && isAlways && isAllProgressed ) {
      start();
    }
  }

});
