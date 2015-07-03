(function() {
    "use strict";
    
	angular
        .module("weather-icon-directive", ["weather-icon-controller"])
        .directive("weatherIcon", WeatherIcon);

    function WeatherIcon() {
        return {
            restric: "E",
            controller: "weatherIconController",
            templateUrl: "./components/forecast/icon.html",
            controllerAs: "iconCtrl"
        };
    }
})();