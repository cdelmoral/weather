(function() {
	'use strict';
	
	angular
		.module('google-chart-service', ['forecast-service'])
		.service('googleChartService', GoogleChartService);

	GoogleChartService.$inject = ['forecastService'];

	function GoogleChartService(forecastService) {
		var service = this;

		service.dailyMinMaxTemps = dailyMinMaxTemps;
		service.hourlyTemps = hourlyTemps;
		service.dailyPrecipAcc = dailyPrecipAcc;
		service.hourlyPrecipProb = hourlyPrecipProb;

		function dailyMinMaxTemps() {
			var gChart = {
				data: null,
				options: {
					title: "Maximum and minimum temperatures",
					width: 500,
					height: 300,
					hAxis: {
						format: 'E d',
						slantedText: true
					},
					vAxis: {
						title: "Temperature (\u00B0F)"
					},
					legend: {
						position: "none"
					}
				}
			};

			var data = new google.visualization.DataTable();
			data.addColumn('date', 'Day');
			data.addColumn('number', 'Low');
			data.addColumn('number', 'High');

			var forecast = forecastService.getForecast();

			if (forecast.daily.data.length > 0) {
				var dailyData = forecast.daily.data;
				for (var i = 0; i < dailyData.length; i++) {
					var dayOfWeek = new Date(dailyData[i].time * 1000);
					data.addRow([
						dayOfWeek,
						dailyData[i].temperatureMin,
						dailyData[i].temperatureMax
					]);
				}
			}

			var formatter = new google.visualization.DateFormat({pattern: 'EEEE d'});
			formatter.format(data, 0);

			gChart.data = data;

			return gChart;
		}

		function hourlyTemps() {
			var gChart = {
				data: null,
				options: {
					title: "Temperature",
					width: 500,
					height: 300,
					hAxis: {
						format: 'E haa',
						slantedText: true
					},
					vAxis: {
						title: "Temperature (\u00B0F)"
					},
					legend: {
						position: "none"
					}
				}
			};

			var data = new google.visualization.DataTable();
			data.addColumn('date', 'Hour');
			data.addColumn('number', 'Temperature');

			var forecast = forecastService.getForecast();

			if (forecast.hourly.data.length > 0) {
				var hourlyData = forecast.hourly.data;
				for (var i = 0; i < hourlyData.length; i++) {
					var hourOfDay = new Date(hourlyData[i].time * 1000);
					data.addRow([
						hourOfDay,
						hourlyData[i].temperature
					]);
				}
			}

			var formatter = new google.visualization.DateFormat({pattern: 'EEEE haa'});
			formatter.format(data, 0);

			gChart.data = data;

			return gChart;
		}

		function dailyPrecipAcc() {
			var gChart = {
				data: null,
				options: {
					title: "Accumulated precipitation",
					width: 500,
					height: 300,
					hAxis: {
						format: 'E d',
						slantedText: true
					},
					vAxis: {
						title: "Accumulated precipitation"
					},
					legend: {
						position: "none"
					}
				}
			};

			var data = new google.visualization.DataTable();
			data.addColumn('date', 'Day');
			data.addColumn('number', 'Probability');

			var forecast = forecastService.getForecast();

			if (forecast.daily.data.length > 0) {
				var dailyData = forecast.daily.data;
				for (var i = 0; i < dailyData.length; i++) {
					var dayOfWeek = new Date(dailyData[i].time * 1000);
					data.addRow([
						dayOfWeek,
						dailyData[i].precipAccumulation
					]);
				}
			}

			var formatter = new google.visualization.DateFormat({pattern: 'EEEE d'});
			formatter.format(data, 0);

			gChart.data = data;

			return gChart;
		}

		function hourlyPrecipProb() {
			var gChart = {
				data: null,
				options: {
					title: "Precipitation probability",
					width: 500,
					height: 300,
					hAxis: {
						format: 'E haa',
						slantedText: true
					},
					vAxis: {
						title: "Precipitation probability"
					},
					legend: {
						position: "none"
					}
				}
			};

			var data = new google.visualization.DataTable();
			data.addColumn('date', 'Hour');
			data.addColumn('number', 'Probability');

			var forecast = forecastService.getForecast();

			if (forecast.hourly.data.length > 0) {
				var hourlyData = forecast.hourly.data;
				for (var i = 0; i < hourlyData.length; i++) {
					var hourOfDay = new Date(hourlyData[i].time * 1000);
					data.addRow([
						hourOfDay,
						hourlyData[i].precipProbability
					]);
				}
			}

			var formatter = new google.visualization.DateFormat({pattern: 'EEEE haa'});
			formatter.format(data, 0);

			gChart.data = data;

			return gChart;
		}
	}
})();