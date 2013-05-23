test( 'single element', function() {
  var elem = document.querySelector('#mario-with-shell');
  stop();
  imagesLoaded( elem ).on( 'done', function( obj ) {
    ok( true, 'single element worked' );
    ok( obj.images, 'argument has images' );
    equal( obj.images.length, 1, 'images.length = 1' );
    start();
  });
});
