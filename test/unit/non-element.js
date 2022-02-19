QUnit.test( 'dismiss non-element nodes', function( assert ) {
  let $ = window.jQuery;
  let done = assert.async( 2 );

  $( '<img src="https://picsum.photos/401/301/?random" />' +
  '<img src="https://picsum.photos/402/302/?random" /> ' )
    .imagesLoaded( function() {
      assert.ok( true, 'elements from jQuery string ok' );
      done();
    } );

  // test fragment
  let frag = document.createDocumentFragment();
  let img = new Image();
  img.src = 'https://picsum.photos/403/303/?random';
  frag.appendChild( img );
  let imgLoad = imagesLoaded( frag, function() {
    assert.ok( true, 'document fragment ok' );
    assert.equal( imgLoad.images.length, 1, '1 image found' );
    done();
  } );

} );
