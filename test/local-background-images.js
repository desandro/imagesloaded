test( 'local background images', function() {

  'use strict';

  var elem = document.querySelector('#local-background-images');
  var isCallbacked, isFailed, isAlways, isAllProgressed;
  // stop();
  var imgLoader = new imagesLoaded( elem, { background: true }, function( obj ) {
    ok( true, 'callback function triggered' );
    equal( imgLoader, obj, 'callback argument and instance match' );
    isCallbacked = true;
    checkReady();
  });
  imgLoader.on( 'fail', function() {
    ok( true, 'fail event triggered' );
    isFailed = true;
    checkReady();
  });
  imgLoader.on( 'always', function() {
    ok( true, 'always event triggered' );
    isAlways = true;
    checkReady();
  });

  var progressCount = 0;
  imgLoader.on( 'progress', function( loader, image ) {
    ok( true, 'image progressed');
    ok( image.isLoaded, 'image is loaded' );
    progressCount++;
    if ( progressCount >= 2 ) {
      equal( progressCount, 2, 'progressed 2 times' );
      isAllProgressed = true;
      checkReady();
    }
  });

  stop();

  function checkReady() {
    if ( isCallbacked && isFailed && isAlways && isAllProgressed ) {
      start();
    }
  }

});
