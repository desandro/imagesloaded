( function( window ) {

'use strict';

var progressElem;
var loadedImageCount;
var statusElem;

window.onload = function() {
  var demo = document.querySelector('#demo')
  var addButton = demo.querySelector('#add');
  var container = demo.querySelector('#image-container');
  statusElem = demo.querySelector('#status');
  progressElem = demo.querySelector('progress');

  addButton.onclick = function() {
    // add new images
    var fragment = document.createDocumentFragment();
    for ( var i = 0; i < 7; i++ ) {
      var item = getImageItem();
      fragment.appendChild( item );
    }
    container.insertBefore( fragment, container.firstChild );
    // use ImagesLoaded
    var imgLoad = ImagesLoaded( container );
    imgLoad.on( 'progress', onProgress );
    imgLoad.on( 'always', onAlways );
    // reset progress counter
    statusElem.style.opacity = 1;
    loadedImageCount = 0;
    progressElem.setAttribute( 'value', 0 );
    progressElem.setAttribute( 'max', imgLoad.images.length );
  };

  // reset container
  document.querySelector('#reset').onclick = function() {
    while ( container.firstChild ) {
      container.removeChild( container.firstChild );
    }
  };
};

// triggered after each item is loaded
function onProgress( imgLoad, image ) {
  // change class if the image is loaded or broken
  image.img.parentNode.className = image.isLoaded ? '' : 'is-broken';
  // update progress element
  loadedImageCount++;
  progressElem.setAttribute( 'value', loadedImageCount );
}

function onAlways() {
  statusElem.style.opacity = 0;
}

// return an <li> with a <img> in it
function getImageItem() {
  var item = document.createElement('li');
  item.className = 'is-loading';
  var img = document.createElement('img');
  var size = Math.random() * 3 + 1;
  var width = Math.random() * 110 + 100;
  width = Math.round( width * size );
  var height = Math.round( 140 * size );
  var rando = Math.ceil( Math.random() * 1000 );
  // 10% chance of broken image src
  var src = rando < 100 ? '//foo/broken.jpg' :
    // use lorempixel for great random images
    '//lorempixel.com/' + width + '/' + height + '/';
  // random parameter to prevent cached images
  img.src = src + '?' + rando;
  item.appendChild( img );
  return item;
}


})( window );

