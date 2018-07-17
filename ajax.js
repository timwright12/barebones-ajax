/**
 * @file A simple Ajax call that will work down to IE10
 * @author Tim Wright
 * @license MIT
 * @example ajax({ 'url' : 'http://...', 'type' : 'GET', 'data' : 'json' }, function( data ){ /callback function here/ });
 */

( function ( global ) {
	
	'use strict';

	function ajax( options, callback ) {
		
		var defaults = {
			'url' : null,
			'type' : 'GET',
			'dataType' : 'html'
		},
		request = new XMLHttpRequest(),
		httpresponse,
		i;
		
		// map all default settings to user defined options
		for ( i = 0; i < defaults.length; i = i + 1 ) {
			if ( typeof options[i] === "undefined" ) {
				options[i] = defaults[i];
			}
		}
		 
		 // Check for fetch() support
		if ( 'fetch' in window ) {

			fetch( options.url, {
				method: options.type
			} )
				.then( function( response ) {
					if ( 'json' === options.dataType ) {
						return response.json();
					} else {
						return response.text()
					}
				} )
				.then( function( data ) {
					
					// make sure the callback is indeed a function before executing it
					if ( 'function' === typeof callback ) {
						callback( data );
					} // end check
				} );
			
		} else {

			request.onreadystatechange = function() {

				// check to see if the Ajax call went through
				if ( request.readyState === 4 && request.status === 200 ) {

					// Save the ajax response to a variable
					if( 'json' === options.dataType ){
						httpresponse = JSON.parse(request.responseText);
					} else if( 'xml' === options.dataType ){
					    httpresponse = request.responseXML;
					} else {
						httpresponse = request.responseText;
					}

					// make sure the callback is indeed a function before executing it
					if ( 'function' === typeof callback ) {
						callback( httpresponse );
					} // end check

				} // end ajax status check

			}; // end onreadystatechange

			request.open( options.type, options.url, true );
			request.send( null );

		}

	}; // ajax();
	
	if ( typeof module !== 'undefined' && typeof module.exports !== 'undefined' ) {
		module.exports = ajax;
	} else if ( typeof define === 'function' && define.amd ) {
		define('ajax', [], function () {
			return ajax;
		} );
	} else if ( typeof global === 'object' ) {
		global.ajax = ajax;
	}

} )( typeof global !== 'undefined' ? global : window );