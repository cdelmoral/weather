(function() {
	'use strict';

	angular
		.module('db-service', ['firebase'])
		.service('dbService', DBService);

	DBService.$inject = ['$firebase'];

	function DBService($firebase) {
		var service = this;

		var syncObject;

		service.getCities = function() {
			var ref = new Firebase("https://vivid-inferno-5672.firebaseio.com/cities");
			var sync = $firebase(ref);
			syncObject = sync.$asArray();
			return syncObject;
		};

		service.saveCity = function(city) {
			syncObject.$add({city: city});
		};
	}
})();