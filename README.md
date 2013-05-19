# imagesLoaded

[desandro.github.io/imagesloaded](http://desandro.github.io/imagesloaded/)

Detect when images have been loaded.

## Install

Get a packaged source file from [desandro.github.io/imagesloaded](http://desandro.github.io/imagesloaded/) or install via [Bower](http://bower.io)

``` bash
bower install imagesloaded
```

## Usage

``` js
ImagesLoaded( elem, callback )
// you can use `new` if you like
new ImagesLoaded( elem, callback )
```

+ `elem` _Element, NodeList, Array, or Selector String_
+ `callback` _Function_ - function triggered after all images have been loaded

``` js
// element
ImagesLoaded( document.querySelector('#container'), function( instance ) {
  console.log('all images are loaded');
});
// selector string
ImagesLoaded( '#container', function() {...});
// multiple elements
var posts = document.querySelectorAll('.post');
ImagesLoaded( posts, function() {...});
```


## Events

ImagesLoaded is an Event Emitter. You can bind event listeners to events.

```
var imgLoad = ImagesLoaded( elem );
function onAlways( instance ) {
  console.log('all images are loaded');
}
// bind with .on()
imgLoad.on( 'always', onAlways );
// unbind with .off()
imgLoad.off( 'always', onAlways );
```

### always

``` js
imgLoad.on( 'always', function( instance ) {
  console.log('all images have been loaded');
});
```

Triggered after all images have been either loaded or confirmed broken.

+ `instance` _ImagesLoaded_ - the ImagesLoaded instance

### done

``` js
imgLoad.on( 'done', function( instance ) {
  console.log('all images have been successfully loaded');
});
```

Triggered after all images have successfully loaded without any broken images.

### fail

``` js
imgLoad.on( 'done', function( instance ) {
  console.log('all images loaded, at least one is broken');
});
```

Triggered after all images have been loaded with at least one broken image.

### progress

``` js
imgLoad.on( 'progress', function( instance, image ) {
  var result = image.isLoaded ? 'loaded' : 'broken';
  console.log( 'image is ' + result + ' for ' + image.img.src + );
});
```

Triggered after each image has been loaded.

+ `instance` _ImagesLoaded_ - the ImagesLoaded instance
+ `image` _LoadingImage_ - the LoadingImage instance of the loaded image

## Properties

### LoadingImage.img

_Image_ - The `img` element

### LoadingImage.isLoaded

_Boolean_ - `true` when the image has succesfully loaded

### ImagesLoaded.images

Array of _LoadingImage_ instances for each image detected

``` js
var imgLoad = ImagesLoaded('#container');
imgLoad.on( 'always', function() {
  console.log( imgLoad.images.length + ' images loaded' );
  // detect which image is broken
  for ( var i = 0, len = imgLoad.images.length; i < len; i++ ) {
    var image = imgLoad.images[i];
    var result = image.isLoaded ? 'loaded' : 'broken';
    console.log( 'image is ' + result + ' for ' + image.img.src + );
  }
});
```

## jQuery

If you include jQuery, ImagesLoaded can be used as a jQuery Plugin.

``` js
$('#container').imagesLoaded( function() {
  // images have loaded
});
```

### jQuery Deferred

The jQuery plugin returns a [jQuery Deferred object](http://api.jquery.com/category/deferred-object/). This allows you to use `.always()`, `.done()`, `.fail()` and `.progress()`, similarly to the emitted events.

``` js
$('#container').imagesLoaded()
  .always( function( instance ) {
    console.log('all images loaded');
  })
  .done( function( instance ) {
    console.log('all images successfully loaded');
  })
  .fail( function() {
    console.log('all images loaded, at least one is broken');
  })
  .progress( function( instance, image ) {
    var result = image.isLoaded ? 'loaded' : 'broken';
    console.log( 'image is ' + result + ' for ' + image.img.src + );
  });
```

## MIT License

ImagesLoaded is released under the [MIT License](http://desandro.mit-license.org/). Have at it.
