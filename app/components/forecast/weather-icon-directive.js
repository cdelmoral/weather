(function() {

	var app = angular.module('weather-icon-directive', ['forecast-service']);

	app.directive("weatherIcon", ['forecastService', function(forecastService) {
		return {
			restric: "E",
			controller: function($scope) {
				this.baseUrl = ".//img/";
				this.imageName = "";
				this.imgurl = "";
				var ctrl = this;

				this.setImgUrl = function() {
					var forecast = forecastService.getForecast();
					if (forecast === undefined) {
						return;
					}
					switch (forecast.currently.icon) {
						case "clear-day":
							ctrl.imageName = "clear-day.png";
							break;
						case "clear-night":
							ctrl.imageName = "clear-night.png";
							break;
						case "cloudy":
							ctrl.imageName = "cloudy.png";
							break;
						case "fog":
							ctrl.imageName = "fog.png";
							break;
						case "partly-cloudy-day":
							ctrl.imageName = "partly-cloudy-day.png";
							break;
						case "partly-cloudy-night":
							ctrl.imageName = "partly-cloudy-night.png";
							break;
						case "rain":
							ctrl.imageName = "rain.png";
							break;
						case "sleet":
							ctrl.imageName = "sleet.png";
							break;
						case "snow":
							ctrl.imageName = "snow.png";
							break;
						default:
							ctrl.imageName = "";
							break;
					}
					ctrl.imgurl = ctrl.baseUrl + ctrl.imageName;
				};

				$scope.$on('forecastChanged', ctrl.setImgUrl);
			},
			templateUrl: "./components/forecast/icon.html",
			controllerAs: "iconCtrl"
		};
	}]);
})();