(function() {
	var app = angular.module('weather-icon-directive', ['weather-icon-controller']);

	app.directive("weatherIcon", function() {
		return {
			restric: "E",
			controller: "weatherIconController",
			templateUrl: "./components/forecast/icon.html",
			controllerAs: "iconCtrl"
		};
	});
})();