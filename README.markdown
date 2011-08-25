imagesLoaded
============

A small jQuery plugin that triggers a callback after all the child images in a parent element have been loaded.  Because you can't do `.load()` on images.

    $('#my-container').imagesLoaded( function( $images ) {
      // callback provides one argument, the jQuery object of child images
      console.log( $images.length + ' images have been loaded in ' + this )
    });

[**See demo**](http://desandro.github.com/imagesloaded/)

Used in [Masonry](http://desandro.masonry.com/) and [Isotope](http://isotope.metafizzy.co/).