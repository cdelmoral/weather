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

		var weeklyMinMaxTemps = function(forecast) {
			var data = new google.visualization.DataTable();
			data.addColumn('string', 'Day')
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

			return data;
		};

		return {
			restrict: 'E',
			link: function($scope, elm, attrs) {
				$scope.$watch('forecast', function() {
					if ($scope.forecast !== undefined) {
						var gChart = {
							data: null,
							options: {
								chart: {
									title: attrs.title
								},
								width: 900,
								height: 500
							}
						};
						gChart.data = weeklyMinMaxTemps($scope.forecast);

						var chart = new google.charts.Line(elm[0]);
						chart.draw(gChart.data, gChart.options);
					}
				}, true);
			}
		};
	});
})();