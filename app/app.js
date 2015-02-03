(function() {

	/**
	 * We need to manually start angular as we need to wait for the google charting
	 * libs to be ready.
	 */  
	google.setOnLoadCallback(function () {  
		angular.bootstrap(document.body, ['weather']);
	});
	google.load('visualization', '1.1', {packages: ['line']});

	var app = angular.module('weather', []);
	var URL_F_BASE = "https://api.forecast.io/forecast/";
	var FORECAST_KEY = "1c673c349f398fbbbe6ab58f290abefe";

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

	app.controller('MainController', ['$http', function($http) {
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
			var forecastUrl = URL_F_BASE + FORECAST_KEY + "/" + lat + "," + lng;
			$http.get(forecastUrl).success(function (data) {
				ctrl.forecast = data;
				ctrl.drawChart();
			});
		};

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
				} else {
					alert('Geocode was not successful for the following reason: ' + status);
				}
				ctrl.retrieveForecast();
			});
		};

		this.drawChart = function () {
			var data = new google.visualization.DataTable();
			data.addColumn('string', 'Day')
			data.addColumn('number', 'High');
			data.addColumn('number', 'Low');

			if (ctrl.forecast.daily.data.length > 0) {
				var dailyData = ctrl.forecast.daily.data;
				var daysOfTheWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
				for (var i = 0; i < dailyData.length; i++) {
					var dayOfWeek = new Date(dailyData[i].time * 1000);
					data.addRow([
						daysOfTheWeek[dayOfWeek.getDay()],
						dailyData[i].temperatureMin,
						dailyData[i].temperatureMax
					]);
				}
			}

			var options = {
				chart: {
					title: 'Maximum and minimum temperatures'
				},
				width: 900,
				height: 500
			};

			var chart = new google.charts.Line(document.getElementById('chart_div'));

			chart.draw(data, options);
		};

		this.init();
	}]);
})();