( function() {

let progressElem, statusElem,
        supportsProgress,
        loadedImageCount, imageCount;

let demo = document.querySelector('#progress-demo');
let container = demo.querySelector('#image-container');
statusElem = demo.querySelector('#status');
progressElem = demo.querySelector('progress');

supportsProgress = progressElem &&
  // IE does not support progress
  progressElem.toString().indexOf('Unknown') === -1;

demo.querySelector('#add').onclick = function() {
  // add new images
  let fragment = getItemsFragment();
  container.insertBefore( fragment, container.firstChild );
  // use ImagesLoaded
  let imgLoad = imagesLoaded( container );
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

function empty( elem ) {
  while ( elem.firstChild ) {
    elem.removeChild( elem.firstChild );
  }
}

// -----  ----- //

// return doc fragment with
function getItemsFragment() {
  let fragment = document.createDocumentFragment();
  for ( let i = 0; i < 7; i++ ) {
    let item = getImageItem();
    fragment.appendChild( item );
  }
  return fragment;
}

// return an <li> with a <img> in it
function getImageItem() {
  let item = document.createElement('li');
  item.className = 'is-loading';
  let img = document.createElement('img');
  let size = Math.random() * 3 + 1;
  let width = Math.random() * 110 + 100;
  width = Math.round( width * size );
  let height = Math.round( 140 * size );
  let rando = Math.ceil( Math.random() * 1000 );
  // 10% chance of broken image src
  // random parameter to prevent cached images
  img.src = rando < 100 ? `//foo/broken-${rando}.jpg` :
    // use picsum photos for great random images
    `https://picsum.photos/${width}/${height}/?${rando}`;
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
    statusElem.textContent = value + ' / ' + imageCount;
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

// -------------------------- github button -------------------------- //

let user = 'desandro';
let repo = 'imagesloaded';

// get data
let callbackName = 'ghButtonCallback' + Math.floor( Math.random() * 10000 );
let button = document.querySelector('.gh-button');

window[ callbackName ] = function( response ) {
  let starText = addCommas( response.data.stargazers_count );
  button.querySelector('.gh-button__stat__text').textContent = starText;
};

function addCommas( num ) {
  return num.toString().replace( /(\d)(?=(\d{3})+$)/g, '$1,' );
}

let script = document.createElement('script');
script.src = `https://api.github.com/repos/${user}/${repo}?callback=${callbackName}`;
document.head.appendChild( script );

} )();
