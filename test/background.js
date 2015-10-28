QUnit.test( 'background', function( assert ) {
  'use strict';

  // from Modernizr
  var supportsMultiBGs = ( function() {
    var style = document.createElement('a').style;
    style.cssText = 'background:url(https://),url(https://),red url(https://)';
    return (/(url\s*\(.*?){3}/).test(style.background);
  })();

  var multiBGCount = supportsMultiBGs ? 3 : 0;
  var done = assert.async( 6 + multiBGCount );

  var imgLoad0 = imagesLoaded( '#background .tulip', { background: true }, function() {
    assert.ok( true, 'callback triggered on .orange-tree');
    assert.equal( imgLoad0.images.length, 1, '1 image on .images' );
    done();
  });

  var imgLoad1 = imagesLoaded( '#background .thunder-cloud', { background: true }, function() {
    assert.ok( true, 'callback triggered on .thunder-cloud');
    assert.equal( imgLoad1.images.length, 1, '1 image on .images' );
    done();
  });

  // multiple backgrounds
  var imgLoad2 = imagesLoaded( '#background .multi', { background: true }, function() {
    assert.ok( true, 'callback triggered on .multi');
    assert.equal( imgLoad2.images.length, multiBGCount, 'correct multiple BG count on .images' );
    done();
  });

  // multiple elements
  var imgLoad3 = imagesLoaded( '#background .bg-box', { background: true }, function() {
    assert.ok( true, 'callback triggered on .bg-box');
    var count = 2 + multiBGCount;
    assert.equal( imgLoad3.images.length, count, count + ' images on .bg-box' );
    done();
  });

  imgLoad3.on('progress', function( instance, image, element ) {
    assert.ok( true, 'progress on .bg-box; ' + image.img.src );
    assert.equal( image.isLoaded, true, 'image.isLoaded == true' );
    assert.equal( element.nodeName, 'DIV', 'element is DIV, not IMG' );
    done();
  });

});
