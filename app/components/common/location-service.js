(function() {
	'use strict';

	angular
		.module('location-service', [])
		.service('locationService', LocationService);

	LocationService.$inject = ['$rootScope'];

	function LocationService($rootScope) {
		var service = this;

		var city = null;
		var coords = {};

		service.getCoords = function() {
			return coords;
		};

		service.getCity = function() {
			return city;
		};

		service.searchCity = function(search) {
			var geocoder = new google.maps.Geocoder();
			geocoder.geocode({'address': search}, function(results, status) {
				if (status == google.maps.GeocoderStatus.OK) {
					var location = results[0].geometry.location;
					coords = {latitude: location.lat(), longitude: location.lng()};
					city = results[0].address_components[0].long_name;
					$rootScope.$broadcast('coordsChanged');
				} else {
					alert('Geocode was not successful for the following reason: ' + status);
				}
			});
		};

		service.searchCity("Chicago, IL");
	}
})();