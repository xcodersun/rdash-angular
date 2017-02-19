angular.module('VivoDash')
    .controller('DevicesExploreCtrl', ['$scope', '$http', '$cookies', 'config', '$stateParams', '$state', '$uibModal', 'flashService', DevicesExploreCtrl]);

function DevicesExploreCtrl($scope, $http, $cookies, config, $stateParams, $state, $uibModal, flashService) {
	var dec = this;
	var cid = $stateParams.cid;
	var did = $stateParams.did;
	var url = config.apiAdminConnectionStatus.replace("%s", cid).replace("%s", did);
	console.log(url);

	var authToken = $cookies.getObject('authToken');
	$http({
		url: url,
		method: 'GET',
		headers: {
			'Authentication': authToken.token
		},
	}).then(function (response) {
		console.log(response.data);
	});

	return
}
