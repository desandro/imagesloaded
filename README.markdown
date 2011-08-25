imagesLoaded
============

A small jQuery plugin that triggers a callback after all the child images in a parent element have been loaded.  Because you can't do `.load()` on images.

    $('#my-container').imagesLoaded( function( $images ) {
      // callback provides one argument, the jQuery object of child images
      console.log( $images.length + ' images have been loaded in ' + this )
    });

[**See demo**](http://desandro.github.com/imagesloaded/)

Used in [Masonry](http://desandro.masonry.com/) and [Isotope](http://isotope.metafizzy.co/).

## Contribute

It ain't easy knowing when images have loaded. [Every browser has its own little quirks](https://github.com/desandro/imagesloaded/wiki/Browser-quirks) that make this a difficult task to develop a cross-browser solution. Pull requests, testing, [issues](https://github.com/desandro/imagesloaded/issues), and commentary are all highly encouraged (pleasepleaseplease) and very much appreciated.