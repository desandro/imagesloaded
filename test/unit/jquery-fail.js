QUnit.test( 'jquery fail', function( assert ) {
  let $ = window.jQuery;
  let $images = $('#jquery-fail img');
  let done = assert.async( 3 + $images.length );

  $('#jquery-fail').imagesLoaded( function( instance ) {
      assert.ok( true, 'callback triggered' );
      assert.ok( instance instanceof imagesLoaded, 'instance instanceof imagesLoaded' );
      done();
    } )
    .fail( function( instance ) {
      assert.ok( true, 'fail triggered' );
      assert.ok( instance instanceof imagesLoaded, 'instance instanceof imagesLoaded' );
      done();
    } )
    .always( function( instance ) {
      assert.ok( true, 'always triggered' );
      assert.ok( instance instanceof imagesLoaded, 'instance instanceof imagesLoaded' );
      done();
    } )
    .progress( function( /* instance, image */) {
      assert.ok( true, 'progress trigged' );
      done();
    } );

  } );
