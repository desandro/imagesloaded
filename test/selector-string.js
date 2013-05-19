test( 'selector string', function() {
  stop();
  var imgLoad = ImagesLoaded('#basics', { debug: true }).on( 'done', function( obj ) {
    ok( true, 'selector string worked' );
    ok( obj.images, 'argument has images' );
    equal( obj.images.length, 4, 'images.length = 4' );
    start();
  });
  ok( imgLoad.options.debug, 'debug option set' );
});
