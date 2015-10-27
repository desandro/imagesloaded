test( 'append', function() {
  // create images
  var fragment = document.createDocumentFragment();
  for ( var i=0; i < 4; i++ ) {
    var img = document.createElement('img');
    var size = ( i + 1 ) * 50;
    img.src = 'http://lorempixel.com/' + size + '/' + size + '/nature';
    fragment.appendChild( img );
  }

  var elem = document.querySelector('#append');
  elem.appendChild( fragment );

  stop();
  var imgLoad = imagesLoaded( elem, { debug: true } ).on( 'done', function() {
    ok( 'appended images loaded' );
    start();
  }); 

});
