(function() {
	"use strict";

	angular
		.module("google-chart-directive", ["google-chart-service"])
		.directive("googleChart", GoogleChart);

	var LINE_CHART = "line";
	var COLUMN_CHART = "column";

	GoogleChart.$inject = ["googleChartService"];

	function GoogleChart(googleChartService) {
		var directive = {
			restrict: "E",
			template: "<div></div>",
			replace: true,
			link: linkFunction
		};

		return directive;

		function linkFunction($scope, elm, attrs) {
			$scope.$on("forecastChanged", function() {
				updateChart(elm, attrs);
			});
		}

		function updateChart(elm, attrs) {
			switch(attrs.type) {
				case "daily-min-max-temps":
					setChartData(LINE_CHART, googleChartService.dailyMinMaxTemps(), elm);
					break;
				case "daily-precip-acc":
					setChartData(COLUMN_CHART, googleChartService.dailyPrecipAcc(), elm);
					break;
				case "hourly-temps":
					setChartData(LINE_CHART, googleChartService.hourlyTemps(), elm);
					break;
				case "hourly-precip-prob":
					setChartData(COLUMN_CHART, googleChartService.hourlyPrecipProb(), elm);
					break;
				default:
					break;
			}
		}

		function setChartData(type, gChart, elm) {
			var chart;
			switch (type) {
				case LINE_CHART:
					chart = new google.visualization.LineChart(elm[0]);
					break;
				case COLUMN_CHART:
					chart = new google.visualization.ColumnChart(elm[0]);
					break;
				default:
					break;
			}
			chart.draw(gChart.data, gChart.options);
		}
	}
})();