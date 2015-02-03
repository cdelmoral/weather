(function() {
	var app = angular.module('forecast-service', []);

	app.factory('forecastService', function() {
		var WEEK_DAYS = [
			'Sunday',
			'Monday',
			'Tuesday',
			'Wednesday',
			'Thursday',
			'Friday',
			'Saturday'
		];

		var service = {};

		service.weeklyMinMaxTemps = function (forecast) {
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

		return service;
	});
})();