(function() {
	"use strict";

	angular
		.module("forecast-service", [])
		.service("forecastService", ForecastService);

	ForecastService.$inject = ["$rootScope", "$http"];

	var URL_F_BASE = "https://api.forecast.io/forecast/";
	var FORECAST_KEY = "1c673c349f398fbbbe6ab58f290abefe";

	function ForecastService($rootScope, $http) {
		var service = this;
		service.setCoords = setCoords;

		var forecast = {};
		var location = {};

		function setCoords(lat, lng) {
			if (location.latitude != lat || location.longitude != lng) {
				var forecastUrl = URL_F_BASE + FORECAST_KEY + "/" + lat + "," + lng + "?callback=JSON_CALLBACK";
				$http.jsonp(forecastUrl).success(function (data) {
					forecast = data;
					$rootScope.$broadcast("forecastChanged");
				});
			}
		}

		function getForecast() {
			return forecast;
		}
	}
})();