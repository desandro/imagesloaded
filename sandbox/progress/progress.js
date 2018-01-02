/* jshint strict: false */

var progressElem, statusElem;
var supportsProgress;
var loadedImageCount, imageCount;

var container = document.querySelector('#image-container');
statusElem = document.querySelector('#status');
progressElem = document.querySelector('progress');

supportsProgress = progressElem &&
  // IE does not support progress
  progressElem.toString().indexOf('Unknown') === -1;

document.querySelector('#add').onclick = function() {
  // add new images
  var fragment = getItemsFragment();
  container.insertBefore( fragment, container.firstChild );
  // use ImagesLoaded
  var imgLoad = imagesLoaded( container );
  imgLoad.on( 'progress', onProgress );
  imgLoad.on( 'always', onAlways );
  // reset progress counter
  imageCount = imgLoad.images.length;
  resetProgress();
  updateProgress( 0 );
};

// reset container
document.querySelector('#reset').onclick = function() {
  empty( container );
};

// ----- set text helper ----- //

var docElem = document.documentElement;
var textSetter = docElem.textContent !== undefined ? 'textContent' : 'innerText';

function setText( elem, value ) {
  elem[ textSetter ] = value;
}

function empty( elem ) {
  while ( elem.firstChild ) {
    elem.removeChild( elem.firstChild );
  }
}

// -----  ----- //

// return doc fragment with
function getItemsFragment() {
  var fragment = document.createDocumentFragment();
  for ( var i = 0; i < 7; i++ ) {
    var item = getImageItem();
    fragment.appendChild( item );
  }
  return fragment;
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
  // random parameter to prevent cached images
  img.src = rando < 100 ? '//foo/broken-' + rando + '.jpg' :
    // use picsum for great random images
    'https://picsum.photos/' + width + '/' + height + '/' + '?random';
  item.appendChild( img );
  return item;
}

// -----  ----- //

function resetProgress() {
  statusElem.style.opacity = 1;
  loadedImageCount = 0;
  if ( supportsProgress ) {
    progressElem.setAttribute( 'max', imageCount );
  }
}

function updateProgress( value ) {
  if ( supportsProgress ) {
    progressElem.setAttribute( 'value', value );
  } else {
    // if you don't support progress elem
    setText( statusElem, value + ' / ' + imageCount );
  }
}

// triggered after each item is loaded
function onProgress( imgLoad, image ) {
  // change class if the image is loaded or broken
  image.img.parentNode.className = image.isLoaded ? '' : 'is-broken';
  // update progress element
  loadedImageCount++;
  updateProgress( loadedImageCount );
}

// hide status when done
function onAlways() {
  statusElem.style.opacity = 0;
}
