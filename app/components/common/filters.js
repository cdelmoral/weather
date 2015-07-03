(function() {
	"use strict";

	angular
		.module("filters", [])
		.filter("temp", temp);

	temp.$inject = ["$filter"];

	function temp($filter) {
		return tempFilter;

		function tempFilter(input) {
			if (input !== undefined) {
				var numberFilter = $filter("number");
				return numberFilter(input, 1) + "\u00B0F";
			} else {
				return "-";
			}
		}
	}
	
})();