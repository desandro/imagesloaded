# imagesLoaded

http://desandro.github.com/imagesloaded/

A jQuery plugin that triggers a callback after all the selected/child images have been loaded. Because you can't do `.load()` on cached images.

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
dfd.progress( function( isBroken, $images, $proper, $broken ){
  // function scope (this) is a jQuery object with image that has just finished loading
  // callback provides four arguments:
  // isBroken: boolean value of whether the loaded image (this) is broken
  // $images:  jQuery object with all images in set
  // $proper:  jQuery object with properly loaded images so far
  // $broken:  jQuery object with broken images so far
  console.log( 'Loading progress: ' + ( $proper.length + $broken.length ) + ' out of ' + $images.length );
});
```

### Requirements

Deferred is being used only when present, so having older versions of jQuery doesn't break the plugin, just removes the functionality.
For using any Deferred method, you need jQuery **v1.5** and higher.
For using Deferred progress method, you need jQuery **v1.7** and higher.
For availability of other Deferred methods, read the [jQuery Deferred object documentation](http://api.jquery.com/category/deferred-object/).

## Behavior notes

### Caching

The state of all once checked images is cached, so the calls repeated on the same images don't have to go through a determining process for each image again.
Determining might be slow in older browsers in which we have to reset `src`, and also might introduce image flickering.

Image state is stored in `$.data` associated to that particular image DOM element. That means that everything is stored per page load,
so you don't have to worry that temporarily unavailable images will be considered as broken on a next page load as well. This is just for a multiple calls within one page load.

If, however, you need it from some reason, you can remove this data from an image with:

```js
$.removeData( img, 'imagesLoaded' );
```

### Image flickering

In IE (particularly in older versions) you might see images flicker as plugin has to refresh all `src` attributes to catch event types. That is the only known
way how to check for loading status of both proper and broken images in IE browsers, as these dinosaurs don't bother changing any image property once an image has
been recognized as broken. The only thing they do is send an `error` event. Without refreshing `src` and catching it, it would be impossible to differentiate
between broken images and proper images that are still loading.

Thankfully, this flickering is invisible most of the time.

## Known issues

+ unreliable differentiation between proper and broken images in Opera versions lower than 11 (market share ~0.1%), but callback still fires

## Contribute

It ain't easy knowing when images have loaded. [Every browser has its own little quirks](https://github.com/desandro/imagesloaded/wiki/Browser-quirks) that make this a difficult task to develop a cross-browser solution. Pull requests, testing, [issues](https://github.com/desandro/imagesloaded/issues), and commentary are all highly encouraged (pleasepleaseplease) and very much appreciated.

### Contributors

+ [**View contributors**](https://github.com/desandro/imagesloaded/contributors)
+ [ajp](http://groups.google.com/group/jquery-dev/browse_thread/thread/eee6ab7b2da50e1f)
+ Oren Solomianik

