/*!
 * jQuery imagesLoaded plugin v1.0.1
 * http://github.com/desandro/imagesloaded
 *
 * MIT License
 * Original author: Paul Irish
 * Contributors: Yiannis Chatzikonstantinou, David DeSandro
 *   Oren Solomianik, Adam J. Sontag, Sascha Depold
 */

// $('#my-container').imagesLoaded(myFunction)
// execute a callback when all images have loaded.
// needed because .load() doesn't work on cached images

// callback function gets image collection as argument
//  `this` is the container

(function($) {
  $.fn.imagesLoaded = function( callback ) {
    var $images = this.find('img'),
        len = $images.length,
        _this = this,
        blank = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==';

    function triggerCallback() {
      callback.call( _this, $images );
    }

    function imgLoaded() {
      if ( --len <= 0 && this.src !== blank ){
        setTimeout( triggerCallback );
        $images.unbind( 'load error', imgLoaded );
      }
    }

    if ( !len ) {
      triggerCallback();
    }

    $images.bind( 'load error',  imgLoaded ).each( function() {
      // cached images don't fire load sometimes, so we reset src.
      if (this.complete || this.complete === undefined){
        var src = this.src;
        // webkit hack from http://groups.google.com/group/jquery-dev/browse_thread/thread/eee6ab7b2da50e1f
        // data uri bypasses webkit log warning (thx doug jones)
        this.src = blank;
        this.src = src;
      }
    });

    return this;
  };
})(jQuery);