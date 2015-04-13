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
		var output = "";

		$('p', this).each(function() {
			var text = $(this).html();

			var parts = text.split(":");
			if (parts.length === 1) {
				output += "<blockquote>" + parts[0] + "</blockquote>";	
				return;
			}

			output +=  "<div class='callout lead callout-" + calloutClass(parts[0]) + "'><h4>"+ parts[0] +"!</h4><p>" + text.slice(parts[0].length+1) + "</p></div>";
		});

		return output;
	});
});
