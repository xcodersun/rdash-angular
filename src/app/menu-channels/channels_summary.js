angular.module('VivoDash')
    .controller('ChannelsSummaryCtrl', ['$http', '$cookies', 'config', '$uibModal', '$state', ChannelsSummaryCtrl]);

function ChannelsSummaryCtrl($http, $cookies, config, $uibModal, $state) {
	var csc = this;
	csc.channels = {};
	csc.deleteChannel = deleteChannel;

	var authToken = $cookies.getObject('authToken');

	$http({
		url: config.apiAdminChannels,
		method: 'GET',
		headers: {
			'Authentication': authToken.token
		},
	}).then(success).catch(fail);

	return;

	function success(response) {
		csc.channels = response.data;
	}

	function fail(e) {
		console.log(e);
	}

	function deleteChannel(channel) {
		var modalInstance = $uibModal.open({
			animation: true,
			ariaLabelledBy: 'modal-title',
			ariaDescribedBy: 'modal-body',
			templateUrl: 'templates/menu-channels/channels_summary_delete.html',
			controller: 'ChannelsSummaryDelete',
			controllerAs: 'csd',
			backdrop: 'static',
			size: 'md',
			resolve: {
				channel: function() {
					return channel;
				}
			}
		});
		modalInstance.result.then(function() {
			$state.reload();
		});
	}
}
