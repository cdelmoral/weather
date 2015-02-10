(function() {
	var app = angular.module('tab-controller', []);

	app.controller('tabController', function() {
	this.tab = 1;
	var ctrl = this;

	this.isSet = function(checkTab) {
		return ctrl.tab === checkTab;
	};

	this.setTab = function(activeTab) {
		ctrl.tab = activeTab;
	};
	});
})();