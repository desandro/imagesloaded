test( 'dismiss non-element nodes', function() {

  'use strict';

  var $ = window.jQuery;
  stop();
  $(' <img src="http://lorempixel.com/401/301/" /> <img src="http://lorempixel.com/402/302/" /> ')
    .imagesLoaded(function() {
      ok( true, 'elements from jQuery string ok' );
      start();
      testFrag();
    });

  function testFrag() {
    stop();
    var frag = document.createDocumentFragment();
    var img = new Image();
    img.src = 'http://lorempixel.com/403/303/';
    frag.appendChild( img );
    var imgLoad = imagesLoaded( frag, function() {
      ok( true, 'document fragment ok' );
      equal( imgLoad.images.length, 1, '1 image found' );
      start();
    });
  }

});
