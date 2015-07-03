(function() {
	"use strict";
	
	angular
		.module("form-controller", ["location-service", "db-service"])
		.controller("formController", FormController);

	FormController.$inject = ["locationService", "dbService"];

	function FormController(locationService, dbService) {
		var ctrl = this;

		ctrl.savedCities = dbService.getCities();

		ctrl.searchCity = function() {
			ctrl.selection = null;
			locationService.searchCity(this.inputCity);
			this.inputCity = "";
		};

		ctrl.selectSaved = function(option) {
			if (option !== null) {
				locationService.searchCity(option.city);
			}
		};

		ctrl.saveCity = function() {
			var city = locationService.getCity();
			if (!isAlreadySaved(city)) {
				dbService.saveCity(city);
				ctrl.savedCities.push(city);
			}
		};

		function isAlreadySaved (city) {
			for (var i = 0; i < ctrl.savedCities.length; i++) {
				if (ctrl.savedCities[i].city == city) {
					return true;
				}
			}
			return false;
		}
	}
})();