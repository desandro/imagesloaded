test( 'jquery fail', function() {

  'use strict';

  var $ = window.jQuery;
  var isCallbacked, isFailed, isAlways, isAllProgressed;
  var progressCount = 0;
  var $images = $('#jquery-fail img');
  stop();

  $('#jquery-fail').imagesLoaded( function( instance ) {
      ok( true, 'callback triggered' );
      ok( instance instanceof imagesLoaded, 'instance instanceof imagesLoaded' );
      isCallbacked = true;
      checkReady();
    })
    .fail( function( instance ) {
      ok( true, 'done triggered' );
      ok( instance instanceof imagesLoaded, 'instance instanceof imagesLoaded' );
      isFailed = true;
      checkReady();
    })
    .always( function( instance ) {
      ok( true, 'always triggered' );
      ok( instance instanceof imagesLoaded, 'instance instanceof imagesLoaded' );
      isAlways = true;
      checkReady();
    })
    .progress( function() {
      progressCount++;
      if ( progressCount >= $images.length ) {
        equal( progressCount, $images.length, 'progressed iterations matches images length' );
        isAllProgressed = true;
        checkReady();
      }
    });

  function checkReady() {
    if ( isCallbacked && isFailed && isAlways && isAllProgressed ) {
      start();
    }
  }

});
