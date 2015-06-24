(function() {
	'use strict';

	angular
		.module('forecast-controller', ['forecast-service'])
		.controller('forecastController', ForecastController);

	ForecastController.$inject = ['$scope', 'forecastService', 'locationService'];

	function ForecastController($scope, forecastService, locationService) {
		var ctrl = this;
		var coords = {};

		ctrl.forecast = {};
		ctrl.city = null;

		ctrl.updateCoords = function() {
			coords = locationService.getCoords();
			ctrl.city = locationService.getCity();
			forecastService.setCoords(coords.latitude, coords.longitude);
		};

		ctrl.onForecastChanged = function() {
			ctrl.forecast = forecastService.getForecast();
		};

		$scope.$on('forecastChanged', ctrl.onForecastChanged);
		$scope.$on('coordsChanged', ctrl.updateCoords);
	}
})();