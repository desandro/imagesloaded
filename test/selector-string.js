test( 'selector string', function() {
  stop();
  var images = document.querySelectorAll('#basics img');
  var imgLoad = imagesLoaded('#basics', { debug: true }).on( 'done', function( obj ) {
    ok( true, 'selector string worked' );
    ok( obj.images, 'argument has images' );
    equal( obj.images.length, images.length, 'images.length matches' );
    start();
  });
  ok( imgLoad.options.debug, 'debug option set' );
});
