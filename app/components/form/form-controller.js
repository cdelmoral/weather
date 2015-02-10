(function() {
	var app = angular.module('form-controller', ['location-service', 'db-service']);

	app.controller('formController', ['locationService', 'dbService', function(locationService, dbService) {
		var ctrl = this;

		ctrl.savedCities = dbService.getCities();

		ctrl.searchCity = function() {
			ctrl.selection = null;
			locationService.searchCity(this.inputCity);
			this.inputCity = "";
		};

		ctrl.selectSaved = function(option) {
			if (option != null) {
				locationService.searchCity(option.city);
			}
		};

		ctrl.saveCity = function() {
			dbService.saveCity(locationService.getCity());
			ctrl.savedCities.push(city);
		};
	}]);
})();