angular.module('VivoDash')
    .controller('DevicesExploreCtrl', ['$scope', '$http', '$cookies', 'config', '$stateParams', '$state', '$uibModal', DevicesExploreCtrl]);

function DevicesExploreCtrl($scope, $http, $cookies, config, $stateParams, $state, $uibModal) {
	var dec = this;
	var cid = $stateParams.cid;
	var did = $stateParams.did;

	// No device found
	if (angular.isUndefined(cid) || angular.isUndefined(did)) {
		var modalInstance = $uibModal.open({
			animation: true,
			ariaLabelledBy: 'modal-title',
			ariaDescribedBy: 'modal-body',
			templateUrl: 'templates/menu-devices/views/devices_explore_warning.html',
			controller: 'DevicesExploreWarningCtrl',
			controllerAs: 'dewc',
			backdrop: 'static',
			size: 'sm',
		});
		modalInstance.result.then(function() {
			$state.go('sidebar.devices_summary', {title: 'channel'});
		});
		return;
	}

	var url = config.apiAdminConnectionStatus.replace("%s", cid).replace("%s", did);
	var authToken = $cookies.getObject('authToken');
	$http({
		url: url,
		method: 'GET',
		headers: {
			'Authentication': authToken.token
		},
	}).then(function (response) {
		dec.device = response.data;
	});

	return
}
