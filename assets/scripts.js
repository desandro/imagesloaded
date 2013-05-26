( function( window ) {

'use strict';

var progressElem, statusElem;
var supportsProgress;
var loadedImageCount;

window.onload = function() {
  var demo = document.querySelector('#demo');
  var addButton = demo.querySelector('#add');
  var container = demo.querySelector('#image-container');
  statusElem = demo.querySelector('#status');
  progressElem = demo.querySelector('progress');

  supportsProgress = progressElem &&
    // IE does not support progress
    progressElem.toString().indexOf('Unknown') === -1;

  addButton.onclick = function() {
    // add new images
    var fragment = document.createDocumentFragment();
    for ( var i = 0; i < 7; i++ ) {
      var item = getImageItem();
      fragment.appendChild( item );
    }
    container.insertBefore( fragment, container.firstChild );
    // use ImagesLoaded
    var imgLoad = imagesLoaded( container );
    imgLoad.on( 'progress', onProgress );
    imgLoad.on( 'always', onAlways );
    // reset progress counter
    statusElem.style.opacity = 1;
    loadedImageCount = 0;
    if ( supportsProgress ) {
      progressElem.setAttribute( 'max', imgLoad.images.length );
    }
    updateProgress( 0, imgLoad );
  };

  // reset container
  document.querySelector('#reset').onclick = function() {
    while ( container.firstChild ) {
      container.removeChild( container.firstChild );
    }
  };
};

// ----- set text helper ----- //

var docElem = document.documentElement;
var textSetter = docElem.textContent !== undefined ? 'textContent' : 'innerText';

function setText( elem, value ) {
  elem[ textSetter ] = value;
}

// -----  ----- //

function updateProgress( value, imgLoad ) {
  if ( supportsProgress ) {
    progressElem.setAttribute( 'value', value );
  } else {
    // if you don't support progress elem
    setText( statusElem, value + ' / ' + imgLoad.images.length );
  }
}

// triggered after each item is loaded
function onProgress( imgLoad, image ) {
  // change class if the image is loaded or broken
  image.img.parentNode.className = image.isLoaded ? '' : 'is-broken';
  // update progress element
  loadedImageCount++;
  updateProgress( loadedImageCount, imgLoad );
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

