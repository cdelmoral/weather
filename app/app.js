(function() {
	var app = angular.module('weather', []);
	var URL_BASE = "https://api.forecast.io/forecast/";
	var FORECAST_KEY = "1c673c349f398fbbbe6ab58f290abefe";

	app.controller('MainController', ['$window', '$document', '$http', function($window, $document, $http) {
		this.latitude = 45;
		this.longitude = -73;
		this.zoom = 8;
		this.forecast = {};


		var url = URL_BASE + FORECAST_KEY + "/" + this.latitude + "," + this.longitude;
		var ctrl = this;
		$http.get(url).success(function (data) {
			ctrl.forecast = data;
		});

		var mapOptions = {
			key: "AIzaSyDmHFUiBuupTJdS9HFLT3zC4Qgd86ZOv6g",
			center: { lat: this.latitude, lng: this.longitude},
			zoom: 8
		};
		var map = new google.maps.Map(document.getElementById('map-canvas'),
			mapOptions);
	}]);
})();