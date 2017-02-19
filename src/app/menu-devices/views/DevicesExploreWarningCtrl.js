angular.module('VivoDash')
    .controller('DevicesExploreWarningCtrl', ['$uibModalInstance', DevicesExploreWarningCtrl]);

function DevicesExploreWarningCtrl($uibModalInstance) {
	var dewc = this;

	dewc.close = function() {
		$uibModalInstance.close('');
	}
}