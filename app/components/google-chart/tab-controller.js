(function() {
	var app = angular.module('tab-controller', []);

	app.controller('tabController', function() {
		var ctrl = this;

		ctrl.tab = 1;

		ctrl.isSet = function(checkTab) {
			return ctrl.tab === checkTab;
		};

		ctrl.setTab = function(activeTab) {
			ctrl.tab = activeTab;
		};
	});
})();