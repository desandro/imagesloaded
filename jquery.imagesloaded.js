// $('img.photo',this).imagesLoaded(myFunction)
// execute a callback when all images have loaded.
// needed because .load() doesn't work on cached images

// Modified with a two-pass approach to changing image
// src. First, the proxy imagedata is set, which leads
// to the first callback being triggered, which resets
// imagedata to the original src, which fires the final,
// user defined callback.

// modified by yiannis chatzikonstantinou.

// original:
// mit license. paul irish. 2010.
// webkit fix from Oren Solomianik. thx!

// callback function is passed the last image to load
//   as an argument, and the collection as `this`


$.fn.imagesLoaded = function( callback ){
  var elems = this.find( 'img' ),
      elems_src = [],
      self = this,
      len = elems.length;

  if ( !elems.length ) {
    callback.call( this );
    return this;
  }

  elems.one('load error', function() {
    if ( --len === 0 ) {
      // Rinse and repeat.
      len = elems.length;
      elems.one( 'load error', function() {
        if ( --len === 0 ) {
          callback.call( self );
        }
      }).each(function() {
        this.src = elems_src.shift();
      });
    }
  }).each(function() {
    elems_src.push( this.src );
    // webkit hack from http://groups.google.com/group/jquery-dev/browse_thread/thread/eee6ab7b2da50e1f
    // data uri bypasses webkit log warning (thx doug jones)
    this.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
  });

  return this;
};