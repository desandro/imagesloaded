QUnit.test( 'dismiss non-element nodes', function( assert ) {
  'use strict';

  var $ = window.jQuery;
  var done = assert.async( 2 );

  $(' <img src="http://lorempixel.com/401/301/" /> <img src="http://lorempixel.com/402/302/" /> ')
    .imagesLoaded(function() {
      assert.ok( true, 'elements from jQuery string ok' );
      done();
    });

  // test fragment
  var frag = document.createDocumentFragment();
  var img = new Image();
  img.src = 'http://lorempixel.com/403/303/';
  frag.appendChild( img );
  var imgLoad = imagesLoaded( frag, function() {
    assert.ok( true, 'document fragment ok' );
    assert.equal( imgLoad.images.length, 1, '1 image found' );
    done();
  });

});
