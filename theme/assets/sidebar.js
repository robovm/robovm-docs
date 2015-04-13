'use strict';

$(function () {
	$(".article.active").closest("li.treeview").addClass( 'active' );

	var index = null;

	var useIndex = function(data) {
		index = lunr.Index.load(data);
	};

	var loadIndex = function() {
		var basePath = $("#book").data("basepath");
		$.getJSON(basePath + "/search_index.json")
		.then(useIndex);
	};

	var search = function(q) {
		if (!index) return;
		var results = _.chain(index.search(q))
		.map(function(result) {
			var parts = result.ref.split("#")
			return {
				path: parts[0],
				hash: parts[1]
			}
		})
		.value();

		return results;
	};

	var filterSummary = function(paths) {
		var $summary = $("#book-summary");

		$summary.find("li").each(function() {
			var path = $(this).data("path");
			var st = paths == null || _.contains(paths, path);

			$(this).toggle(st);
			if (st) $(this).parents("li").show();
		});

		if (paths) {
			$summary.find(".treeview").addClass("searched");
		} else {
			$summary.find(".treeview").removeClass("searched");
		}
	};

	$(document).on("keyup", "#book-search input", function(e) {
		var key = (e.keyCode ? e.keyCode : e.which);
		var input = $(this);
		var q = input.val();

		if (key == 27) {
			e.preventDefault();
			filterSummary(null);
			input.val('');
			input.blur();	
			return;
		}

		if (q.length == 0) {
			filterSummary(null);
		} else {
			filterSummary(_.pluck(search(q), "path"));
		}
	});

	loadIndex();
});
