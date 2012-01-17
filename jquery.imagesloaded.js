/*!
 * jQuery imagesLoaded plugin v1.2.1
 * http://github.com/desandro/imagesloaded
 *
 * MIT License. by Paul Irish et al.
 */

(function($, undefined) {

// $('#my-container').imagesLoaded(myFunction)
// or
// $('img').imagesLoaded(myFunction)

// execute a callback when all images have loaded.
// needed because .load() doesn't work on cached images

// callback is executed when all images has fineshed loading
// callback function arguments: $all_images, $proper_images, $broken_images
// `this` is the jQuery wrapped container

// returns previous jQuery wrapped container extended with deferred object
// done method arguments: .done( function( $all_images ){ ... } )
// fail method arguments: .fail( function( $all_images, $proper_images, $broken_images ){ ... } )
// progress method arguments: .progress( function( images_count, loaded_count, proper_count, broken_count )

$.fn.imagesLoaded = function( callback ) {
	var $this = this,
		deferred = $.Deferred(),
		$images = $this.find('img').add( $this.filter('img') ),
		len = $images.length,
		blank = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==',
		loaded = [],
		proper = [],
		broken = [];

	function doneLoading() {
		var $proper = $(proper),
			$broken = $(broken);

		if ( broken.length ) {
			deferred.reject( $images, $proper, $broken );
		} else {
			deferred.resolve( $images );
		}

		callback.call( $this, $images, $proper, $broken );
	}

	function imgLoaded( event ) {
		// dont proceed if img src is blank or if img is already loaded
		if ( event.target.src === blank || $.inArray( this, loaded ) !== -1 ) {
			return;
		}

		loaded.push( this );
		// keep track of broken and properly loaded images
		if ( event.type === 'error' ) {
			broken.push( this );
		} else {
			proper.push( this );
		}

		deferred.notify( $images.length, loaded.length, proper.length, broken.length );

		if ( --len <= 0 ){
			setTimeout( doneLoading );
			$images.unbind( '.imagesLoaded', imgLoaded );
		}
	}

	// if no images, trigger immediately
	if ( !len ) {
		doneLoading();
	}

	$images.bind( 'load.imagesLoaded error.imagesLoaded', imgLoaded ).each( function() {
		// cached images don't fire load sometimes, so we reset src.
		var src = this.src;
		// webkit hack from http://groups.google.com/group/jquery-dev/browse_thread/thread/eee6ab7b2da50e1f
		// data uri bypasses webkit log warning (thx doug jones)
		this.src = blank;
		this.src = src;
	});

	return deferred.promise( $this );
};

})(jQuery);
