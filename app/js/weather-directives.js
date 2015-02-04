(function() {

	var app = angular.module('weather-directives', []);

	app.directive("googleChart", function() {
		var WEEK_DAYS = [
			'Sunday',
			'Monday',
			'Tuesday',
			'Wednesday',
			'Thursday',
			'Friday',
			'Saturday'
		];

		var getChart = function(type) {
			switch(type) {
				case "daily-min-max-temps":
					return dailyMinMaxTemps;
				case "daily-precip-acc":
					return dailyPrecipAcc;
				case "hourly-temps":
					return hourlyTemps;
				case "hourly-precip-prob":
					return hourlyPrecipProb;
				default:
					return null;
			}
		};

		var dailyMinMaxTemps = function(forecast, elm, attrs) {
			var gChart = {
				data: null,
				options: {
					title: "Maximum and minimum temperatures",
					width: 500,
					height: 300,
					vAxis: {
						title: "Temperature (\u00B0F)"
					},
					legend: {
						position: "none"
					}
				}
			};

			var data = new google.visualization.DataTable();
			data.addColumn('string', 'Day');
			data.addColumn('number', 'Low');
			data.addColumn('number', 'High');

			if (forecast.daily.data.length > 0) {
				var dailyData = forecast.daily.data;
				for (var i = 0; i < dailyData.length; i++) {
					var dayOfWeek = new Date(dailyData[i].time * 1000);
					data.addRow([
						WEEK_DAYS[dayOfWeek.getDay()],
						dailyData[i].temperatureMin,
						dailyData[i].temperatureMax
					]);
				}
			}

			var chart = new google.visualization.LineChart(elm[0]);
			chart.draw(data, gChart.options);
		};

		var hourlyTemps = function(forecast, elm, attrs) {
			var gChart = {
				data: null,
				options: {
					title: "Temperature",
					width: 500,
					height: 300,
					vAxis: {
						title: "Temperature (\u00B0F)"
					},
					legend: {
						position: "none"
					}
				}
			};

			var data = new google.visualization.DataTable();
			data.addColumn('string', 'Hour');
			data.addColumn('number', 'Temperature');

			if (forecast.hourly.data.length > 0) {
				var hourlyData = forecast.hourly.data;
				for (var i = 0; i < hourlyData.length; i++) {
					var hourOfDay = new Date(hourlyData[i].time * 1000);
					data.addRow([
						hourOfDay.toTimeString() + " " + hourOfDay.getDate(),
						hourlyData[i].temperature
					]);
				}
			}

			var chart = new google.visualization.LineChart(elm[0]);
			chart.draw(data, gChart.options);
		};

		var dailyPrecipAcc = function(forecast, elm, attrs) {
			var gChart = {
				data: null,
				options: {
					title: "Accumulated precipitation",
					width: 500,
					height: 300,
					vAxis: {
						title: "Accumulated precipitation"
					},
					legend: {
						position: "none"
					}
				}
			};

			var data = new google.visualization.DataTable();
			data.addColumn('string', 'Day');
			data.addColumn('number', 'Probability');

			if (forecast.daily.data.length > 0) {
				var dailyData = forecast.daily.data;
				for (var i = 0; i < dailyData.length; i++) {
					var dayOfWeek = new Date(dailyData[i].time * 1000);
					data.addRow([
						WEEK_DAYS[dayOfWeek.getDay()],
						dailyData[i].precipAccumulation
					]);
				}
			}

			var chart = new google.visualization.ColumnChart(elm[0]);
			chart.draw(data, gChart.options);
		};

		var hourlyPrecipProb = function(forecast, elm, attrs) {
			var gChart = {
				data: null,
				options: {
					title: "Precipitation probability",
					width: 500,
					height: 300,
					vAxis: {
						title: "Precipitation probability"
					},
					legend: {
						position: "none"
					}
				}
			};

			var data = new google.visualization.DataTable();
			data.addColumn('string', 'Hour');
			data.addColumn('number', 'Probability');

			if (forecast.hourly.data.length > 0) {
				var hourlyData = forecast.hourly.data;
				for (var i = 0; i < hourlyData.length; i++) {
					var hourOfDay = new Date(hourlyData[i].time * 1000);
					data.addRow([
						hourOfDay.toTimeString() + " " + hourOfDay.getDate(),
						hourlyData[i].precipProbability
					]);
				}
			}

			var chart = new google.visualization.ColumnChart(elm[0]);
			chart.draw(data, gChart.options);
		};

		return {
			restrict: 'E',
			template: "<div></div>",
			replace: true,
			link: function($scope, elm, attrs) {
				$scope.$watch('forecast', function() {
					if ($scope.forecast !== undefined) {
						getChart(attrs.type)($scope.forecast, elm, attrs);
					}
				}, true);
			}
		};
	});

	app.directive("weatherIcon", function() {
		return {
			restric: "E",
			controller: function($scope) {
				this.baseUrl = "./images/";
				this.imageName = "";
				this.imgurl = "";
				var ctrl = this;

				this.setImgUrl = function() {
					if ($scope.forecast === undefined) {
						return;
					}
					switch ($scope.forecast.currently.icon) {
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

				$scope.$watch("forecast", function() {
					ctrl.setImgUrl();
				}, true);
			},
			templateUrl: "../../templates/icon.html",
			controllerAs: "iconCtrl"
		};
	});
})();