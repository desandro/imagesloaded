/*!
 * jQuery imagesLoaded plugin v1.2.4
 * http://github.com/desandro/imagesloaded
 *
 * MIT License. by Paul Irish et al.
 */
;(function($, undefined) {

// blank image data-uri
var BLANK = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==';

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
		deferred = $.isFunction($.Deferred) ? $.Deferred() : 0,
		hasNotify = $.isFunction(deferred.notify),
		$images = $this.find('img').add( $this.filter('img') ),
		len = $images.length,
		loaded = [],
		proper = [],
		broken = [];

	function doneLoading() {
		var $proper = $(proper),
			$broken = $(broken);

		if ( deferred ) {
			if ( broken.length ) {
				deferred.reject( $images, $proper, $broken );
			} else {
				deferred.resolve( $images );
			}
		}

		if ( $.isFunction( callback ) ) {
			callback.call( $this, $images, $proper, $broken );
		}
	}

	function imgLoaded( event ) {
		var img = event.target;

		// dont proceed if img src is blank or if img is already loaded
		if ( img.src === BLANK || $.inArray( img, loaded ) !== -1 ) {
			return;
		}

		// store element in loaded images array
		loaded.push( img );

		// keep track of broken and properly loaded images
		if ( event.type === 'error' ) {
			broken.push( img );
		} else {
			proper.push( img );
		}

		// cache event type in element data for future calls
		$.data( img, 'imagesLoaded', { event: event.type, src: img.src } );

		if ( hasNotify ) {
			deferred.notify( $images.length, loaded.length, proper.length, broken.length );
		}

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
		var src = this.src;
		// find out if this image has been already checked for status
		var cached = $.data( this, 'imagesLoaded' );
		// if it was, and src has not changed, trigger the corresponding event
		if ( cached && cached.src === src ) {
			$(this).triggerHandler( cached.event );
			return;
		}
		// cached images don't fire load sometimes, so we reset src.
		// webkit hack from http://groups.google.com/group/jquery-dev/browse_thread/thread/eee6ab7b2da50e1f
		// data uri bypasses webkit log warning (thx doug jones)
		this.src = BLANK;
		this.src = src;
	});

	return deferred ? deferred.promise( $this ) : $this;
};

})(jQuery);
