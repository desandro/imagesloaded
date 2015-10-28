QUnit.test( 'jquery success', function( assert ) {

  'use strict';

  var $ = window.jQuery;
  var done = assert.async( 6 );

  $('#jquery-success').imagesLoaded( function( instance ) {
      assert.ok( true, 'callback triggered' );
      assert.ok( instance instanceof imagesLoaded, 'instance instanceof imagesLoaded' );
      done();
    })
    .done( function( instance ) {
      assert.ok( true, 'done triggered' );
      assert.ok( instance instanceof imagesLoaded, 'instance instanceof imagesLoaded' );
      done();
    })
    .always( function( instance ) {
      assert.ok( true, 'always triggered' );
      assert.ok( instance instanceof imagesLoaded, 'instance instanceof imagesLoaded' );
      done();
    })
    .progress( function( instance, image ) {
      assert.ok( image.isLoaded, 'progress trigged, image is loaded');
      done();
    });

});
