test( 'local files', function() {

  'use strict';

  var elem = document.querySelector('#locals');
  var isCallbacked, isFailed, isAlways, isAllProgressed;
  // stop();
  var imgLoader = new imagesLoaded( elem, function( obj ) {
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
    if ( image.img.src.indexOf('img/not-there.jpg') !== -1 ) {
      ok( !image.isLoaded, 'thunder cloud is not loaded' );
    } else {
      ok( image.isLoaded, 'image is loaded' );
    }
    progressCount++;
    if ( progressCount >= 3 ) {
      equal( progressCount, 3, 'progressed 3 times' );
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
