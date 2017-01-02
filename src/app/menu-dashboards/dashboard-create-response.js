angular.module('VivoDash')
    .controller('DashboardCreateResponse', ['$scope', '$uibModalInstance', DashboardCreateResponse]);

function DashboardCreateResponse($scope, $uibModalInstance) {
	$scope.ok = function () {
		$uibModalInstance.close('');
		window.location = "#/dashboards_dashboard";
	};
}