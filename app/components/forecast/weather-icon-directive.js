(function() {

	var app = angular.module('weather-icon-directive', ['forecast-service']);

	app.directive("weatherIcon", ['forecastService', function(forecastService) {
		return {
			restric: "E",
			controller: function($scope) {
				var ctrl = this;
				var baseUrl = ".//img/";
				var imageName = "";
				
				ctrl.imgurl = "";

				this.setImgUrl = function() {
					var forecast = forecastService.getForecast();
					if (forecast === undefined) {
						return;
					}
					switch (forecast.currently.icon) {
						case "clear-day":
							imageName = "clear-day.png";
							break;
						case "clear-night":
							imageName = "clear-night.png";
							break;
						case "cloudy":
							imageName = "cloudy.png";
							break;
						case "fog":
							imageName = "fog.png";
							break;
						case "partly-cloudy-day":
							imageName = "partly-cloudy-day.png";
							break;
						case "partly-cloudy-night":
							imageName = "partly-cloudy-night.png";
							break;
						case "rain":
							imageName = "rain.png";
							break;
						case "sleet":
							imageName = "sleet.png";
							break;
						case "snow":
							imageName = "snow.png";
							break;
						default:
							imageName = "";
							break;
					}
					ctrl.imgurl = baseUrl + imageName;
				};

				$scope.$on('forecastChanged', ctrl.setImgUrl);
			},
			templateUrl: "./components/forecast/icon.html",
			controllerAs: "iconCtrl"
		};
	}]);
})();