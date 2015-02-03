(function() {

	var app = angular.module('google-charts-directive', []);

	app.directive("googleChart", function() {
		return {
			restrict: 'A',
			link: function($scope, elm, attrs) {
				$scope.$watch('gChart', function() {
					if ($scope.gChart !== undefined) {
						var chart = new google.charts.Line(elm[0]);
						chart.draw($scope.gChart.data, $scope.gChart.options);
					}
				}, true);
			}
		};
	});
})();