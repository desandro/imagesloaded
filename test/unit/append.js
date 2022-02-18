QUnit.test( 'append', function( assert ) {
  let imgUrls = [
    'https://i.imgur.com/bwy74ok.jpg',
    'https://i.imgur.com/bAZWoqx.jpg',
    'https://i.imgur.com/PgmEBSB.jpg',
    'https://i.imgur.com/aboaFoB.jpg',
    'https://i.imgur.com/LkmcILl.jpg',
    'https://i.imgur.com/q9zO6tw.jpg',
  ];

  // create images
  let fragment = document.createDocumentFragment();
  for ( let i = 0, len = imgUrls.length; i < len; i++ ) {
    let img = document.createElement('img');
    img.src = imgUrls[i];
    fragment.appendChild( img );
  }

  let elem = document.querySelector('#append');
  elem.appendChild( fragment );
  let done = assert.async();

  imagesLoaded( elem, { debug: false } ).on( 'always', function() {
    assert.ok('appended images loaded');
    done();
  } );

} );
