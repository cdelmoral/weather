(function() {
	/**
	 * We need to manually start angular as we need to wait for the google charting
	 * libs to be ready.
	 */
	google.setOnLoadCallback(function () {
		angular.bootstrap(document.body, ['weather']);
	});
	google.load('visualization', '1', {packages: ['corechart']});
	// google.load('visualization', '1', {packages: ['corechart']})

	var app = angular.module('weather', [
		'weather-directives',
		'weather-controllers',
		'weather-filters'
		]);

})();