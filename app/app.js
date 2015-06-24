(function() {
	/**
	 * We need to manually start angular as we need to wait for the google charting
	 * libs to be ready.
	 */
	google.setOnLoadCallback(function () {
		angular.bootstrap(document.body, ['weather']);
	});
	google.load('visualization', '1', {packages: ['corechart']});

	angular.module('weather', [
		'filters',
		'location-service',
		'google-maps-controller',
		'form-controller',
		'forecast-service',
		'forecast-controller',
		'tab-controller',
		'google-chart-directive',
		'db-service',
		'weather-icon-controller',
		'weather-icon-directive'
	]);

})();