QUnit.test( 'selector string', function( assert ) {
  let images = document.querySelectorAll('#basics img');
  let done = assert.async();
  let imgLoad = imagesLoaded( '#basics', { debug: true } )
    .on( 'done', function( obj ) {
      assert.ok( true, 'selector string worked' );
      assert.ok( obj.images, 'argument has images' );
      assert.equal( obj.images.length, images.length, 'images.length matches' );
      done();
    } );
  assert.ok( imgLoad.options.debug, 'debug option set' );
} );
