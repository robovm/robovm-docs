'use strict';

$(function () {
	$('section > table').each(function(i, elem) {
		var table = $(elem);
		table.addClass('table');
		table.wrap("<div class='box'></div>");
	});
});
