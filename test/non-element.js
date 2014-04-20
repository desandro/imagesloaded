test( 'dismiss non-element nodes', function() {

  'use strict';

  var $ = window.jQuery;
  stop();
  $(' <img src="http://lorempixel.com/401/301/" /> <img src="http://lorempixel.com/402/302/" /> ')
    .imagesLoaded(function() {
      ok( true, 'elements from jQuery string ok' );
      start();
    });

});
