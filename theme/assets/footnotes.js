'use strict';

$(function () {
	var regex = /\[[0-9]+\]/;

	$("p").replaceWith(function(){
		var text = $(this).html();

		var newText = text.replace(/\[:([0-9]+)\:]/, function(match, p1) {
			return "<i class='footnote' data-content='"+p1+"'></i>";
		});

		return "<p>" + newText + "</p>";
	});

	$("span.hljs-comment").replaceWith(function(){
		var text = $(this).html();

		var matches = text.match(/\[:([0-9]+)\:]/);
		if (null != matches) {
			var num = matches[1];
			return "<i class='footnote' data-content='"+num+"'></i>";
		}

		return text;
	});
});
