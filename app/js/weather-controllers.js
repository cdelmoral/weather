(function() {

	var URL_F_BASE = "https://api.forecast.io/forecast/";
	var FORECAST_KEY = "1c673c349f398fbbbe6ab58f290abefe";
	
	var app = angular.module('weather-controllers', [
		'firebase'
		]);

	app.controller('MainController', ['$scope', '$http', '$firebase', function($scope, $http, $firebase) {
		this.marker = null;
		this.map = null;
		this.address = {};
		// Default to Chicago
		this.address.city = "Chicago, IL";
		this.address.latitude = 41.8337329;
		this.address.longitude = -87.7321555;
		this.zoom = 8;
		this.forecast = {};

		var ctrl = this;
		var lat = this.address.latitude;
		var lng = this.address.longitude;

		this.init = function () {
			var ref = new Firebase("https://vivid-inferno-5672.firebaseio.com/cities");
			var sync = $firebase(ref);
			ctrl.syncObject = sync.$asArray();

			var mapOptions = {
				key: "AIzaSyDmHFUiBuupTJdS9HFLT3zC4Qgd86ZOv6g",
				center: { lat: lat, lng: lng},
				zoom: 8
			};
			ctrl.map = new google.maps.Map(document.getElementById('map-canvas'),
				mapOptions);

			ctrl.submitAddress();
		};

		this.retrieveForecast = function () {
			var forecastUrl = URL_F_BASE + FORECAST_KEY + "/" + lat + "," + lng + "?callback=JSON_CALLBACK";
			$http.jsonp(forecastUrl).success(function (data) {
				ctrl.forecast = data;
				$scope.forecast = data;
			});
		};

		this.submitSaved = function (option) {
			if (option !== null) {
				ctrl.address.city = option.city;
				ctrl.submitAddress();
			}
		}

		this.saveCity = function () {
			ctrl.syncObject.$add({city: this.address.city});
		}

		this.submitAddress = function () {
			var geocoder = new google.maps.Geocoder();
			geocoder.geocode( { 'address': this.address.city}, function(results, status) {
				if (status == google.maps.GeocoderStatus.OK) {
					var location = results[0].geometry.location;
					lat = location.lat();
					lng = location.lng();
					ctrl.map.setCenter(location);
					ctrl.map.setZoom(8);

					// Reset previous marker
					if (ctrl.marker !== null) {
						ctrl.marker.setMap(null);
					}
					ctrl.marker = new google.maps.Marker({
						map: ctrl.map,
						position: location
					});

					// $scope.syncObject.$add({city: ctrl.address.city});
				} else {
					alert('Geocode was not successful for the following reason: ' + status);
				}
				ctrl.retrieveForecast();
			});
		};

		this.init();
	}]);

app.controller("TabController", function() {
	this.tab = 1;
	var ctrl = this;

	this.isSet = function(checkTab) {
		return ctrl.tab === checkTab;
	};

	this.setTab = function(activeTab) {
		ctrl.tab = activeTab;
	};
});

})();