// $('#content-with-images').imagesLoaded( myFunction )
// execute a callback when all images inside a parent have loaded.
// needed because .load() doesn't work on cached images

// Useful for Masonry or Isotope, triggering dynamic layout
// after images have loaded:
//    $('#content').imagesLoaded( function(){
//      $('#content').masonry();
//    });

// mit license. paul irish. 2010.
// webkit fix from Oren Solomianik. thx!

// callback function is passed the last image to load
//   as an argument, and the collection as `this`


$.fn.imagesLoaded = function(callback){
  var elems = this.find('img'),
      len   = elems.length,
      _this = this;
  
  if ( !elems.length ) {
    callback.call( this );
  }

  elems.bind('load',function(){
    if (--len <= 0){ 
      callback.call( _this ); 
    }
  }).each(function(){
    // cached images don't fire load sometimes, so we reset src.
    if (this.complete || this.complete === undefined){
      var src = this.src;
      // webkit hack from http://groups.google.com/group/jquery-dev/browse_thread/thread/eee6ab7b2da50e1f
      // data uri bypasses webkit log warning (thx doug jones)
      this.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
      this.src = src;
    }  
  }); 

  return this;
};
