QUnit.test( 'dismiss non-element nodes', function( assert ) {
  'use strict';

  var $ = window.jQuery;
  var done = assert.async( 2 );

  $(' <img src="https://picsum.photos/401/301/?random" /> <img src="https://picsum.photos/402/302/?random" /> ')
    .imagesLoaded(function() {
      assert.ok( true, 'elements from jQuery string ok' );
      done();
    });

  // test fragment
  var frag = document.createDocumentFragment();
  var img = new Image();
  img.src = 'https://picsum.photos/403/303/?random';
  frag.appendChild( img );
  var imgLoad = imagesLoaded( frag, function() {
    assert.ok( true, 'document fragment ok' );
    assert.equal( imgLoad.images.length, 1, '1 image found' );
    done();
  });

});
