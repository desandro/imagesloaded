/*!
 * imagesLoaded v3.0.0 beta
 * JavaScript is all like "You images are done yet or what?"
 */

( function( window ) {

'use strict';

// -------------------------- helpers -------------------------- //

var objToString = Object.prototype.toString;
function isArray( obj ) {
	return objToString.call( obj ) === '[object Array]';
}

// turn element or nodeList into an array
function makeArray( obj ) {
	var ary = [];
	if ( isArray( obj ) ) {
		// use object if already an array
		ary = obj;
	} else if ( typeof obj.length === 'number' ) {
		// convert nodeList to array
		for ( var i=0, len = obj.length; i < len; i++ ) {
			ary.push( obj[i] );
		}
	} else {
		// array of single index
		ary.push( obj );
	}
	return ary;
}

// --------------------------	-------------------------- //

function defineImagesLoaded( EventEmitter, eventie ) {

	function ImagesLoaded( elem, options ) {
		// coerce ImagesLoaded() without new, to be new ImagesLoaded()
		if ( !( this instanceof ImagesLoaded ) ) {
			return new ImagesLoaded( elem, options );
		}

		this.elements = makeArray( elem );

		// extend options

		this.getImages();

		// HACK check async to allow time to bind listeners
		var _this = this;
		setTimeout( function() {
			_this.check();
		});
	}

	ImagesLoaded.prototype.getImages = function() {
		this.images = [];

		// filter & find items if we have an item selector
		for ( var i=0, len = this.elements.length; i < len; i++ ) {
			var elem = this.elements[i];
			// filter siblings
			if ( elem.nodeName === 'IMG' ) {
				this.images.push( elem );
			}
			// find children
			var childElems = elem.querySelectorAll('img');
			// concat childElems to filterFound array
			for ( var j=0, jLen = childElems.length; j < jLen; j++ ) {
				var img = childElems[j];
				// this.images.push( img );
				var loadingImage = new LoadingImage( img, this );
				this.images.push( loadingImage );
			}
		}
	};

	ImagesLoaded.prototype.check = function() {
		var _this = this;
		var checkedCount = 0;
		var length = this.images.length;
		this.hasAnyBroken = false;
		function onCheck( image ) {
			_this.hasAnyBroken = _this.hasAnyBroken || !image.isLoaded;
			_this.emit( 'progress', [ _this, image ] );
			checkedCount++;
			if ( checkedCount === length ) {
				_this.complete();
			}
			return true; // bind once
		}

		for ( var i=0; i < length; i++ ) {
			var loadingImage = this.images[i];
			loadingImage.on( 'confirm', onCheck );
			loadingImage.check();
		}
	};

	ImagesLoaded.prototype.complete = function() {
		var eventName = this.hasAnyBroken ? 'fail' : 'done';
		this.emit( eventName, [ this ] );
		this.emit( 'always', [ this ] );
		this.isComplete = true;
	};

	// --------------------------	-------------------------- //

	var cache = {};

	function LoadingImage( img, collection ) {
		this.img = img;
		this.collection = collection;
	}

	LoadingImage.prototype.check = function() {
		// first check cached any previous images that have same src
		var cached = cache[ this.img.src ];
		if ( cached ) {
			this.useCached( cached );
			return;
		}
		// add this to cache
		cache[ this.img.src ] = this;

		// If complete is true and browser supports natural sizes,
		// try to check for image status manually.
		if ( this.img.complete && this.img.naturalWidth !== undefined ) {
			// report based on naturalWidth
			this.confirm( this.img.naturalWidth !== 0 );
			return;
		}

		// If none of the checks above matched, simulate loading on detached element.
		var proxyImage = this.proxyImage = new Image();
		eventie.bind( proxyImage, 'load', this );
		eventie.bind( proxyImage, 'error', this );
		proxyImage.src = this.src;
	};

	LoadingImage.prototype.useCached = function( cached ) {
		if ( cached.isConfirmed ) {
			this.confirm( cached.isLoaded );
		} else {
			var _this = this;
			cached.on( 'confirm', function( image ) {
				_this.confirm( image.isLoaded );
				return true; // bind once
			});
		}
	};

	LoadingImage.prototype.confirm = function( isLoaded ) {
		this.isConfirmed = true;
		this.isLoaded = isLoaded;
		this.emit( 'confirm', [ this ] );
	};

	// trigger specified handler for event type
	LoadingImage.prototype.handleEvent = function( event ) {
		var method = 'on' + event.type;
		if ( this[ method ] ) {
			this[ method ]( event );
		}
	};

	LoadingImage.prototype.onload = function() {
		this.confirm( true );
		this.unbindProxyEvents();
	};

	LoadingImage.prototype.onerror = function() {
		this.confirm( false );
		this.unbindProxyEvents();
	};

	LoadingImage.prototype.unbindProxyEvents = function() {
		eventie.unbind( this.proxyImage, 'load', this );
		eventie.unbind( this.proxyImage, 'error', this );
	};

	// -----	----- //

	return ImagesLoaded;
}

// -------------------------- transport -------------------------- //

if ( typeof define === 'function' && define.amd ) {
	// AMD
	define( [
			'eventEmitter',
			'eventie'
		],
		defineImagesLoaded );
} else {
	// browser global
	window.ImagesLoaded = defineImagesLoaded(
		window.EventEmitter,
		window.eventie
	);
}

})( window );
