jQuery(function($){
'use strict';

	// -----------------------------------------------------------------------------------
	//   Simple example
	// -----------------------------------------------------------------------------------
	(function(){

		// Variables
		var $simple = $('#simple'),
			$holder = $simple.find('.holder'),
			$controlbar = $simple.find('.controlbar');

		function runTest( $holder ){

			// Call imagesLoaded and position images
			$holder.imagesLoaded(function( $images, $proper, $broken ){

				var $container = this,
					x = 1;

				$images.each( function() {
					var $this = $(this).css({ left: x });
					x += $this.width() + 1;
				});

				$container.width(x);

			});

		}

		// Controls
		$controlbar.find('[data-action]').click(function(){

			var el = $(this),
				action = el.data('action');

			switch( action ){

				case 'run':
					//Empty holder and apped images
					$holder.empty().append(
						'<img src="img/img1.jpg" alt="Lorempixel">' +
						'<img src="img/img2.jpg" alt="Lorempixel">' +
						'<img src="img/img3.jpg" alt="Lorempixel">' +
						'<img src="img/img4.jpg" alt="Lorempixel">' +
						'<img src="img/img5.jpg" alt="Lorempixel">' +
						'<img src="img/img6.jpg" alt="Lorempixel">'
					);
					runTest( $holder );
				break;

				case 'empty':
					$holder.empty().width('auto');
				break;

				case 'clone':
					var clone = $holder.clone().addClass('clone').append('<span class="remove"/>').insertAfter( $holder );
					runTest( clone );
				break;

			}

		});

		// Click-delete holders
		$simple.on('click', '.clone', function(){

			$(this).fadeOut( 200, function(){

				$(this).remove();

			});

		});

	})();



	// -----------------------------------------------------------------------------------
	//   Advanced example
	// -----------------------------------------------------------------------------------
	(function(){

		// Variables
		var $advanced = $('#advanced'),
			$holder = $advanced.find('.holder'),
			$statusBar = $advanced.find('.status'),
				$totalLabel = $statusBar.find('.totalcount'),
				$properLabel = $statusBar.find('.propercount'),
				$brokenLabel = $statusBar.find('.brokencount'),
				$dfdLabel = $statusBar.find('.dfdstatus'),
			$progress = $advanced.find('.progress'),
			$progressBar = $progress.find('.bar'),
			$controlbar = $advanced.find('.controlbar'),
			broken_urls = [
				'missing.jpg',
				'absent.png',
				'not-here.gif',
				'not-image-url.js',
				'https://example.com/foo.jpg',
				'http://example.com/bar.jpg',
				'https://example.com/image.jpg'
			];

		// Loaded images check
		function checkImages(){

			// Reset status & progress bar
			$holder.children().removeClass();
			$dfdLabel.removeClass('label-success label-important');
			$progressBar.css({ width: 0 });
			$statusBar.hide();
			$progress.show();

			// Call imagesLoaded with multiple callbacks, and save the deferred object
			var dfd = $holder.imagesLoaded({
					callback: function($images, $proper, $broken){

						$totalLabel.text( $images.length );
						$properLabel.text( $proper.length );
						$brokenLabel.text( $broken.length );

					},
					progress: function (isBroken, $images, $proper, $broken) {

						var loadingSpan = this.siblings('.loading');

						if( isBroken ){
							loadingSpan.removeClass('loading').addClass('broken');
						} else {
							loadingSpan.fadeOut(200, function(){ $(this).remove(); });
						}

						$progressBar.css({ width: Math.round( ( ( $proper.length + $broken.length ) * 100 ) / $images.length ) + '%' });

					}
				});

			// Subsequent deferred method registration (not to be used with progress method)
			dfd.always(function(){

				var dfdState = dfd.state();

				$dfdLabel.addClass( 'label-' + ( dfdState === 'resolved' ? 'success' : 'important' ) ).text( dfdState );

				$progress.hide();
				$statusBar.show();
				$progressBar.css({ width: 0 });

			});

		}

		// Add images to holder; 20% of images will be broken by default
		function loadImages( count, brokenPercentile ){

			if( brokenPercentile === undefined ){
				brokenPercentile = 10;
			}

			$holder.loremImages( 600, 800, { count: count, randomWidth: 100, itemBuilder: function( i, url ){

				url = Math.random()*100 < brokenPercentile ? broken_urls[Math.floor( Math.random() * broken_urls.length )]+'?'+Math.round( Math.random()*1000 ) : url;

				return '<li><img src="'+url+'" alt="Image"><span class="loading"></span><span class="remove"></span></li>';

			} });

			checkImages();

		}

		// Controls
		$controlbar.find('[data-action]').click(function(){

			var el = $(this),
				action = el.data('action'),
				count = el.data('count') || 1;

			switch( action ){

				case 'loadImages':
					loadImages(count);
				break;

				case 'removeImages':
					$holder.children().slice(-count).remove();
					checkImages();
				break;

			}

		});

		// Click-delete images
		$holder.on('click', 'li', function(){

			$(this).fadeOut( 200, function(){

				$(this).remove();
				checkImages();

			});

		});

	})();


	// -----------------------------------------------------------------------------------
	//   Page scripts
	// -----------------------------------------------------------------------------------
	(function(){

		// Navigation
		var $nav = $('#nav'),
			$sections = $('#sections').children(),
			activeClass = 'active';

		// Tabs
		$nav.on('click', 'a', function(e){
			e.preventDefault();
			activate( $(this).attr('href').substr(1) );
		});

		// Back to top button
		$('a[href="#top"]').on('click', function(e){
			e.preventDefault();
			$(document).scrollTop(0);
		});

		// Activate a section
		function activate( sectionID, initial ){

			sectionID = sectionID && $sections.filter('#'+sectionID).length ? sectionID : $sections.eq(0).attr('id');
			$nav.find('a').removeClass(activeClass).filter('[href=#'+sectionID+']').addClass(activeClass);
			$sections.hide().filter('#'+sectionID).show();

			if( !initial ){
				window.location.hash = '!' + sectionID;
			}

			$(document).trigger('activated', [ sectionID ] );

		}

		// Activate initial section
		activate( window.location.hash.match(/^#!/) ? window.location.hash.substr(2) : 0, 1 );

	})();

});