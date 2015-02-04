(function() {

	var app = angular.module('google-charts-directive', []);

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
				case "weekly-min-max-temps":
					return weeklyMinMaxTemps;
				case "weekly-precip-acc":
					return weeklyPrecipAcc;
				default:
					return null;
			}
		};

		var weeklyMinMaxTemps = function(forecast, elm, attrs) {
			var gChart = {
				data: null,
				options: {
					title: "Maximum and minimum temperatures",
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

		var weeklyPrecipAcc = function(forecast, elm, attrs) {
			var gChart = {
				data: null,
				options: {
					title: "Accumulated precipitation",
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
})();