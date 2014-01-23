# imagesLoaded

<p class="tagline">JavaScript is all like "You images done yet or what?"</p>

[imagesloaded.desandro.com](http://imagesloaded.desandro.com)

Detect when images have been loaded.

<!-- demo -->

## Install

Get a packaged source file:

+ [imagesloaded.pkgd.min.js](http://imagesloaded.desandro.com/imagesloaded.pkgd.min.js)
+ [imagesloaded.pkgd.js](http://imagesloaded.desandro.com/imagesloaded.pkgd.js)

Or install via [Bower](http://bower.io):

``` bash
bower install imagesloaded
```

Or install via [Component](https://github.com/component/component):

``` js
bower install desandro/imagesloaded
```

## Usage

``` js
imagesLoaded( elem, callback )
// you can use `new` if you like
new imagesLoaded( elem, callback )
```

+ `elem` _Element, NodeList, Array, or Selector String_
+ `callback` _Function_ - function triggered after all images have been loaded

Using a callback function is the same as binding it to the `always` event (see below).

``` js
// element
imagesLoaded( document.querySelector('#container'), function( instance ) {
  console.log('all images are loaded');
});
// selector string
imagesLoaded( '#container', function() {...});
// multiple elements
var posts = document.querySelectorAll('.post');
imagesLoaded( posts, function() {...});
```


## Events

imagesLoaded is an Event Emitter. You can bind event listeners to events.

``` js
var imgLoad = imagesLoaded( elem );
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
  console.log('ALWAYS - all images have been loaded');
});
```

Triggered after all images have been either loaded or confirmed broken.

+ `instance` _imagesLoaded_ - the imagesLoaded instance

### done

``` js
imgLoad.on( 'done', function( instance ) {
  console.log('DONE  - all images have been successfully loaded');
});
```

Triggered after all images have successfully loaded without any broken images.

### fail

``` js
imgLoad.on( 'fail', function( instance ) {
  console.log('FAIL - all images loaded, at least one is broken');
});
```

Triggered after all images have been loaded with at least one broken image.

### progress

``` js
imgLoad.on( 'progress', function( instance, image ) {
  var result = image.isLoaded ? 'loaded' : 'broken';
  console.log( 'image is ' + result + ' for ' + image.img.src );
});
```

Triggered after each image has been loaded.

+ `instance` _imagesLoaded_ - the imagesLoaded instance
+ `image` _LoadingImage_ - the LoadingImage instance of the loaded image

## Properties

### LoadingImage.img

_Image_ - The `img` element

### LoadingImage.isLoaded

_Boolean_ - `true` when the image has succesfully loaded

### imagesLoaded.images

Array of _LoadingImage_ instances for each image detected

``` js
var imgLoad = imagesLoaded('#container');
imgLoad.on( 'always', function() {
  console.log( imgLoad.images.length + ' images loaded' );
  // detect which image is broken
  for ( var i = 0, len = imgLoad.images.length; i < len; i++ ) {
    var image = imgLoad.images[i];
    var result = image.isLoaded ? 'loaded' : 'broken';
    console.log( 'image is ' + result + ' for ' + image.img.src );
  }
});
```

## jQuery

If you include jQuery, imagesLoaded can be used as a jQuery Plugin.

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
    console.log( 'image is ' + result + ' for ' + image.img.src );
  });
```

## RequireJS

imagesLoaded works with [RequireJS](http://requirejs.org).

You can require [imagesloaded.pkgd.js](http://imagesloaded.desandro.com/imagesloaded.pkgd.js).

``` js
requirejs( [
  'path/to/imagesloaded.pkgd.js',
], function( imagesLoaded ) {
  imagesLoaded( '#container', function() { ... });
});
```

Or, you can manage dependencies with [Bower](http://bower.io). Set `baseUrl` to `bower_components` and set a path config for all your application code.

``` js
requirejs.config({
  baseUrl: 'bower_components/',
  paths: { // path your your app
    app: '../'
  }
});

requirejs( [
  'imagesloaded/imagesloaded',
  'app/my-component.js'
], function( imagesLoaded, myComp ) {
  imagesLoaded( '#container', function() { ... });
});
```

## Contributors

This project has a [storied legacy](https://github.com/desandro/imagesloaded/graphs/contributors). Its current incarnation was developed by [Tomas Sardyha @Darsain](http://darsa.in/) and [David DeSandro @desandro](http://desandro.com).

## MIT License

imagesLoaded is released under the [MIT License](http://desandro.mit-license.org/). Have at it.
