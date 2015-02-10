(function() {
	var app = angular.module('google-maps-controller', ['location-service']);

	app.controller('googleMapsController', ['$scope', 'locationService', function($scope, locationService) {
		var ctrl = this;

		ctrl.mapOptions  = {
			key: "AIzaSyDmHFUiBuupTJdS9HFLT3zC4Qgd86ZOv6g",
			center: { lat: null, lng: null},
			zoom: 8
		};

		ctrl.coords = {};
		ctrl.marker = null;
		ctrl.map = null;

		ctrl.updateMap = function() {
			ctrl.coords = locationService.getCoords();
			ctrl.mapOptions.center.lat = ctrl.coords.latitude;
			ctrl.mapOptions.center.lng = ctrl.coords.longitude;

			var latLng;
			if (ctrl.map == null) {
				ctrl.map = new google.maps.Map(document.getElementById('map-canvas'), ctrl.mapOptions);
				latLng = new google.maps.LatLng(ctrl.coords.latitude, ctrl.coords.longitude);
			} else {
				latLng = new google.maps.LatLng(ctrl.coords.latitude, ctrl.coords.longitude);
				ctrl.map.setCenter(latLng);
				ctrl.marker.setMap(null);
			}

			ctrl.marker = new google.maps.Marker({
				map: ctrl.map,
				position: latLng
			});
		};

		$scope.$on('coordsChanged', ctrl.updateMap);
	}]);
})();