(function() {
	'use strict';
	
	angular
		.module('tab-controller', [])
		.controller('tabController', TabController);

	function TabController() {
		var ctrl = this;

		ctrl.tab = 1;

		ctrl.isSet = function(checkTab) {
			return ctrl.tab === checkTab;
		};

		ctrl.setTab = function(activeTab) {
			ctrl.tab = activeTab;
		};
	}
})();