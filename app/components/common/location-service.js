(function() {
	var app = angular.module('location-service', []);

	app.service('locationService', function($rootScope) {
		var service = this;

		service.city = null;
		service.coords = {};

		service.getCoords = function() {
			return service.coords;
		};

		service.getCity = function() {
			return service.city;
		};

		service.searchCity = function(search) {
			var geocoder = new google.maps.Geocoder();
			geocoder.geocode({'address': search}, function(results, status) {
				if (status == google.maps.GeocoderStatus.OK) {
					var location = results[0].geometry.location;
					service.coords = {latitude: location.lat(), longitude: location.lng()};
					service.city = results[0].address_components[0].long_name;
					$rootScope.$broadcast('coordsChanged');
				} else {
					alert('Geocode was not successful for the following reason: ' + status);
				}
			});
		};

		service.searchCity("Chicago, IL");
	});
})();