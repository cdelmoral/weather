(function() {
	"use strict";

	angular
		.module("google-maps-controller", ["location-service"])
		.controller("googleMapsController", GoogleMapsController);

	GoogleMapsController.$inject = ["$scope", "locationService"];

	function GoogleMapsController($scope, locationService) {
		var ctrl = this;

		var mapOptions  = {
			key: "AIzaSyDmHFUiBuupTJdS9HFLT3zC4Qgd86ZOv6g",
			center: { lat: null, lng: null},
			zoom: 8
		};

		var coords = {};
		var marker = null;
		var map = null;

		ctrl.updateMap = function() {
			coords = locationService.getCoords();
			mapOptions.center.lat = coords.latitude;
			mapOptions.center.lng = coords.longitude;

			var latLng;
			if (map === null) {
				map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
				latLng = new google.maps.LatLng(coords.latitude, coords.longitude);
			} else {
				latLng = new google.maps.LatLng(coords.latitude, coords.longitude);
				map.setCenter(latLng);
				marker.setMap(null);
			}

			marker = new google.maps.Marker({
				map: map,
				position: latLng
			});
		};

		$scope.$on("coordsChanged", ctrl.updateMap);
	}
})();