QUnit.test( 'background', function( assert ) {
  'use strict';

  // from Modernizr
  var supportsMultiBGs = ( function() {
    var style = document.createElement('a').style;
    style.cssText = 'background:url(https://),url(https://),red url(https://)';
    return (/(url\s*\(.*?){3}/).test(style.background);
  })();

  var multiBGCount = supportsMultiBGs ? 3 : 0;
  var done = assert.async( 14 + multiBGCount );

  var imgLoad0 = imagesLoaded( '#background .tulip', { background: true }, function() {
    assert.ok( true, 'callback triggered on .orange-tree');
    done();
  });
  assert.equal( imgLoad0.images.length, 1, '1 image on .images' );

  imgLoad0.on( 'progress', function( instance, image, element ) {
    assert.ok( element.nodeName == 'DIV', 'progress; element is div');
    assert.ok( image.isLoaded, 'progress; image.isLoaded');
    done();
  });

  var imgLoad1 = imagesLoaded( '#background .thunder-cloud', { background: true }, function() {
    assert.ok( true, 'callback triggered on .thunder-cloud');
    done();
  });
  assert.equal( imgLoad1.images.length, 1, '1 image on .images' );

  // multiple backgrounds
  var imgLoad2 = imagesLoaded( '#background .multi', { background: true }, function() {
    assert.ok( true, 'callback triggered on .multi');
    done();
  });
  assert.equal( imgLoad2.images.length, multiBGCount, 'correct multiple BG count on .images' );

  // multiple elements
  var imgLoad3 = imagesLoaded( '#background .bg-box', { background: true }, function() {
    assert.ok( true, 'callback triggered on .bg-box');
    var count = 5 + multiBGCount;
    assert.equal( imgLoad3.images.length, count, count + ' images on .bg-box' );
    done();
  });

  imgLoad3.on('progress', function( instance, image/*, element */) {
    assert.ok( true, 'progress on .bg-box; ' + image.img.src );
    assert.equal( image.isLoaded, true, 'image.isLoaded == true' );
    done();
  });

  // background and <img> children
  var imgLoad4 = imagesLoaded( '#background .gulls', { background: true } );
  assert.equal( imgLoad4.images.length, 3, '3 images: 1 background and 2 <img>' );

  imgLoad4.on( 'progress', function( instance, image ) {
    assert.equal( image.isLoaded, true, 'image is loaded' );
    done();
  });

  // child background selector
  var imgLoad5 = imagesLoaded( '#background', { background: '.bg-box' }, function() {
    var count = 5 + multiBGCount;
    assert.equal( imgLoad5.images.length, count,
      count + ' images on .bg-box, with {background: .bg-box}' );
    done();
  });

});
