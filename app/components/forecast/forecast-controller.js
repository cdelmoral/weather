(function() {
	var app = angular.module('forecast-controller', ['forecast-service']);

	app.controller('forecastController', ['$scope', 'forecastService', 'locationService', function($scope, forecastService, locationService) {
		var ctrl = this;
		ctrl.forecast = {};
		ctrl.city = null;

		var coords = {};

		ctrl.updateCoords = function() {
			var coords = locationService.getCoords();
			ctrl.city = locationService.getCity();
			forecastService.setCoords(coords.latitude, coords.longitude);
		}

		ctrl.onForecastChanged = function() {
			ctrl.forecast = forecastService.getForecast();
		}

		$scope.$on('forecastChanged', ctrl.onForecastChanged);
		$scope.$on('coordsChanged', ctrl.updateCoords)
	}]);
})();