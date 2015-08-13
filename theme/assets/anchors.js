'use strict';

$(function () {
	$('section > h1,h2,h3').each(function(i, elem) {
		var header = $(elem);
		var id = header.attr('id');
		header.append('<a name="' + id + '" class="anchor" ' 
									 + 'href="#' + id + '">' 
									 + '<span class="fa fa-link"></span>'
									 + '</a>');
	});
});
