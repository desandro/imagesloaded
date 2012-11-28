# imagesLoaded

http://desandro.github.com/imagesloaded/

A jQuery plugin that triggers a callback after all the selected/child images have been loaded. Because you can't do `.load()` on cached images.


## Calling

```js
$(selector).imagesLoaded( [ callback ] );
```

### selector

ImagesLoaded can be called on an elements with images within them, images directly, or a combination of both.

###### *Example*

```js
// Calling on an element that may contain images
$('#content').imagesLoaded(fn);

// Calling on image elements directly
$('img').imagesLoaded(fn);

// Combination of both
$('#content, #gallery > img').imagesLoaded(fn);
```

### [ callback ]

Callback argument can be a function, or an object map with deferred methods.

#### callback:function

Function that will be called when all images has finished with loading, regardless of their final state (proper/broken).
This is the simplest way how to use imagesLoaded.

##### *this*

When executed, the callback function scope (`this`) is a jQuery object with element or set of elements on which the imagesLoaded has been called (`$(selector)`).

##### arguments

Callback function receives 3 arguments:

+ **$images:** `Object` jQuery object with all images
+ **$proper:** `Object` jQuery object with properly loaded images
+ **$broken:** `Object` jQuery object with broken images

###### *Example*

```js
$('#my-container, .article img').imagesLoaded( function( $images, $proper, $broken ) {
    console.log( $images.length + ' images total have been loaded' );
    console.log( $proper.length + ' properly loaded images' );
    console.log( $broken.length + ' broken images' );
});
```

#### callback:object

To bind deferred methods before the determination process starts, pass an object with map of given method callbacks instead of a callback function.
You can read more about these methods and their behavior in [Deferred section](#deferred) below.

###### *Example*

```js
$(selector).imagesLoaded({
    done: function ($images) {},
    fail: function ($images, $proper, $broken) {},
    always: function () {},
    progress: function (isBroken, $images, $proper, $broken) {}
});
```

If you are passing object with deferred methods, but you still want to use the simple callback functionality, use the `callback` property, like so:

```js
$(selector).imagesLoaded({
    // ... deferred methods ...
    callback: function ($images, $proper, $broken) {}
});
```


## Deferred

As of v1.2.0, `imagesLoaded` returns jQuery deferred object.

### Behaviour

**Resolved**: deferred is *resolved* when all images have been properly loaded

**Rejected**: deferred is *rejected* when at least one image is broken

**Notified**: deferred is *notified* every time an image from stack has finished loading

### Usage
```js
// Save a deferred object with postponed determination process
var dfd = $('#my-container').imagesLoaded();

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

**Important!**: progress method should be always registered with `callback:object` argument, which ensures that it will be registered before the determination process starts.
Otherwise you might run into an issue where by the time you register the progress method all images have been loaded, and there is nothing to report anymore.

### Requirements

+ Deferred is being used only when present, so having older versions of jQuery doesn't break the plugin, just removes the functionality.
+ For using any Deferred method, you need jQuery **v1.5** and higher.
+ For using Deferred progress method, you need jQuery **v1.7** and higher.
+ For availability of other Deferred methods, read the [jQuery Deferred object documentation](http://api.jquery.com/category/deferred-object/).

## Behavior notes

### Determination process

Every browser is handling image elements differently. We are trying to check for state in image attributes when possible & reliable, but in some browsers (especially older ones)
we have to reset `img.src` attribute to re-trigger load/error events. That is the only possible way how to check for an image status,
as well as differentiate between proper and broken images. We are resetting the src with blank image data-uri to bypass webkit log warning (thx doug jones).

Fortunately, since v2.0.0 we are in a state where imagesLoaded is both cross-browser reliable and fast, with only a few minor [known issues](#known-issues).

### Caching

The state of all once checked images is cached, so the calls repeated on the same images don't have to go through a determination process for each image again.
Determining might be slow in older browsers in which we have to reset `src`, and also might introduce image flickering.

Image state is stored in `$.data` associated to that particular image DOM element and its `src` path (changing `src` of an image resets its cache).
That means that everything is stored per page load, so you don't have to worry that temporarily unavailable images will be considered as broken on a next page load as well.
Caching is just for a multiple calls within one page load.

If, however, you need it from some reason, you can remove this data from an image with:

```js
$.removeData( img, 'imagesLoaded' );
```

## Known issues

+ Unreliable differentiation between proper and broken images in Opera versions lower than 11 (market share ~0.1%), but callback still fires.
+ In IE (particularly in older versions) you might see images flicker as plugin has to refresh all `src` attributes to catch event types.
  Thankfully, this flickering is invisible most of the time.

## Contribute

It ain't easy knowing when images have loaded. [Every browser has its own little quirks](https://github.com/desandro/imagesloaded/wiki/Browser-quirks) that make this a difficult task to develop a cross-browser solution. Pull requests, testing, [issues](https://github.com/desandro/imagesloaded/issues), and commentary are all highly encouraged (pleasepleaseplease) and very much appreciated.

### Contributors

+ [**View contributors**](https://github.com/desandro/imagesloaded/contributors)
+ [ajp](http://groups.google.com/group/jquery-dev/browse_thread/thread/eee6ab7b2da50e1f)
+ Oren Solomianik
