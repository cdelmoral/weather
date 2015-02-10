(function() {
	var app = angular.module('google-maps-controller', ['google-maps-service']);

	app.controller('googleMapsController', [function() {
		this.init();
		
		this.init = function() {
			this.mapOptions = {
				key: "AIzaSyDmHFUiBuupTJdS9HFLT3zC4Qgd86ZOv6g",
				center: { lat: lat, lng: lng},
				zoom: 8
			};

			ctrl.map = new google.maps.Map(document.getElementById('map-canvas'),
					mapOptions);

			ctrl.submitAddress();
		};

		this.submitAddress = function () {
			var geocoder = new google.maps.Geocoder();
			geocoder.geocode( { 'address': this.address.city}, function(results, status) {
				if (status == google.maps.GeocoderStatus.OK) {
					var location = results[0].geometry.location;
					lat = location.lat();
					lng = location.lng();
					ctrl.map.setCenter(location);
					ctrl.map.setZoom(8);

					// Reset previous marker
					if (ctrl.marker !== null) {
						ctrl.marker.setMap(null);
					}
					ctrl.marker = new google.maps.Marker({
						map: ctrl.map,
						position: location
					});

					// $scope.syncObject.$add({city: ctrl.address.city});
				} else {
					alert('Geocode was not successful for the following reason: ' + status);
				}
				ctrl.retrieveForecast();
			});
		};
	}]);
})();