'use strict';

$(function () {
	var calloutClass = function(title) {
		switch (title.toLowerCase()) {
			case "tip":
				return "success";
			case "caution":
			case "important":
				return "warning";
			case "warning":
				return "danger";
		}
		return "info";
	}

	$("blockquote").replaceWith(function(){
		var text = $('p', this).html();

		var parts = text.split(":");
		if (parts.length === 1) {
			return text;
		}

		return "<div class='callout lead callout-" + calloutClass(parts[0]) + "'><h4>"+ parts[0] +"!</h4><p>" + text.slice(parts[0].length+1) + "</p></div>";
	});
});
