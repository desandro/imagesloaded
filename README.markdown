# imagesLoaded

http://desandro.github.com/imagesloaded/

A small jQuery plugin that triggers a callback after all the selected/child images have been loaded. Because you can't do `.load()` on cached images.

## Basic usage

```js
$('#my-container').imagesLoaded( function( $images, $proper, $broken ) {
  // callback provides three arguments:
  // $images: the jQuery object with all images
  // $proper: the jQuery object with properly loaded images
  // $broken: the jQuery object with broken images
  // `this` is a jQuery object of container
  console.log( $images.length + ' images total have been loaded in ' + this );
  console.log( $proper.length + ' properly loaded images' );
  console.log( $broken.length + ' broken images' );
});
```

You can call `imagesLoaded` on a set of images as well.

```js
$('.article img').imagesLoaded( myFunction );
```

## Deferred

As of v1.2.0, `imagesLoaded` returns jQuery deferred object.


### Behaviour

**Resolved**: deferred is *resolved* when all images have been properly loaded

**Rejected**: deferred is *rejected* when at least one image is broken

**Notified**: deferred is *notified* every time an image from stack has finished loading

### Usage
```js
var dfd = $('#my-container').imagesLoaded(); // save a deferred object

// Always
dfd.always( function(){
  console.log( 'all images has finished with loading, do some stuff...' );
});

// Resolved
dfd.done( function( $images ){
  // callback provides one argument:
  // $images: the jQuery object with all images
  console.log( 'deferred is resolved with ' + $images.length + ' properly loaded images' );
});

// Rejected
dfd.fail( function( $images, $proper, $broken ){
  // callback provides three arguments:
  // $images: the jQuery object with all images
  // $proper: the jQuery object with properly loaded images
  // $broken: the jQuery object with broken images
  console.log( 'deferred is rejected with ' + $broken.length + ' out of ' + $images.length + ' images broken' );
});

// Notified
dfd.progress( function( total, loaded, proper, broken ){
  // callback provides four integer arguments:
  // total:  number of total images in set
  // loaded: number of all loaded images so far
  // proper: number of properly loaded images so far
  // broken: number of broken images so far
  console.log( 'Loading progress: ' + ( Math.round( ( loaded * 100 ) / total ) ) + '%' );
});
```

## Contribute

It ain't easy knowing when images have loaded. [Every browser has its own little quirks](https://github.com/desandro/imagesloaded/wiki/Browser-quirks) that make this a difficult task to develop a cross-browser solution. Pull requests, testing, [issues](https://github.com/desandro/imagesloaded/issues), and commentary are all highly encouraged (pleasepleaseplease) and very much appreciated.

### Contributors

+ [**View contributors**](https://github.com/desandro/imagesloaded/contributors)
+ [ajp](http://groups.google.com/group/jquery-dev/browse_thread/thread/eee6ab7b2da50e1f)
+ Oren Solomianik

