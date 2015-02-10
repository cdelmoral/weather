(function() {
	var app = angular.module('db-service', ['firebase']);

	app.service('dbService', ['$firebase', function($firebase) {
		var service = this;

		var synObject;

		service.getCities = function() {
			var ref = new Firebase("https://vivid-inferno-5672.firebaseio.com/cities");
			var sync = $firebase(ref);
			syncObject = sync.$asArray();
			return syncObject;
		};

		service.saveCity = function(city) {
			syncObject.$add({city: city});
		}
	}]);
})();