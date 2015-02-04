(function() {

	var app = angular.module("weather-filters", []);

	app.filter('temp', function($filter) {
		return function(input) {
			if (input !== undefined) {
				var numberFilter = $filter('number');
				return numberFilter(input, 1) + '\u00B0F';
			} else {
				return '-';
			}
		};
	});
	
})();