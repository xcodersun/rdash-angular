angular.module('VivoDash')
    .controller('ChannelsSummaryCtrl', ['$http', '$cookies', 'config', '$uibModal', '$state', 'flashService', ChannelsSummaryCtrl]);

function ChannelsSummaryCtrl($http, $cookies, config, $uibModal, $state, flashService) {
	var csc = this;
	csc.channels = {};
	csc.deleteChannel = deleteChannel;
	csc.quickView = quickView;

	var authToken = $cookies.getObject('authToken');

	$http({
		url: config.apiAdminChannels,
		method: 'GET',
		headers: {
			'Authentication': authToken.token
		},
	}).then(function (response) {
		flashService.clear();
		csc.channels = response.data;
	}).catch(function (e) {
		console.log(e);
		flashService.error(e.data["error"], e.status);
	});

	return;

	function quickView(channel) {
	    var modalInstance = $uibModal.open({
	      animation: true,
	      ariaLabelledBy: 'modal-title',
	      ariaDescribedBy: 'modal-body',
	      templateUrl: 'templates/menu-channels/views/channel_quick_view.html',
	      controller: 'ChannelQuickViewCtrl',
	      controllerAs: 'cqvc',
	      size: 'lg',
	      resolve: {
	        channel: function() {
	          return channel;
	        }
	      }
	    });
	}

	function deleteChannel(channel) {
		var modalInstance = $uibModal.open({
			animation: true,
			ariaLabelledBy: 'modal-title',
			ariaDescribedBy: 'modal-body',
			templateUrl: 'templates/menu-channels/views/delete_channel.html',
			controller: 'DeleteChannelCtrl',
			controllerAs: 'dcc',
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
