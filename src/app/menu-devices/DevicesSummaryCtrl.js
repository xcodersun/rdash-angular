angular.module('VivoDash')
    .controller('DevicesSummaryCtrl', ['$http', '$cookies', 'config', '$uibModal', '$state', 'flashService', DevicesSummaryCtrl]);

function DevicesSummaryCtrl($http, $cookies, config, $uibModal, $state, flashService) {
	var dsc = this;
	dsc.devices = [];
	//dsc.quickView = quickView;

	var authToken = $cookies.getObject('authToken');
	$http({
		url: config.apiAdminChannels,
		method: 'GET',
		headers: {
			'Authentication': authToken.token
		},
	}).then(function (response) {
		flashService.clear();
		dsc.channels = response.data;

		for (var i in dsc.channels) {
			var id = dsc.channels[i].id;
			var url = config.apiAdminScanConnections.replace("%s", id);

			var authToken = $cookies.getObject('authToken');
			$http({
				url: url,
				method: 'GET',
				headers: {
					'Authentication': authToken.token
				},
			}).then(function (response) {
				var connections = response.data;
				for (var i = 0; i < connections.length; i++) {
					var device = {};
					device.status = connections[i].status;
					device.name = connections[i].device_id;
					device.ip = connections[i].ip;
					device.channel = connections[i].channel_name;
					device.connection_type = connections[i].connection_type;
					device.connected_at = connections[i].connected_at;
					dsc.devices.push(device);
				}
			}).catch(function(e) {
				/* apiAdminScanConnections */
				console.log(e);
				flashService.error(e.data["error"], e.status);
			});
		}
		console.log(dsc.devices);
	}).catch(function (e) {
		/* apiAdminChannels */
		console.log(e);
		flashService.error(e.data["error"], e.status);
	});

	return;

	/*function quickView(id) {
	    var modalInstance = $uibModal.open({
	      animation: true,
	      ariaLabelledBy: 'modal-title',
	      ariaDescribedBy: 'modal-body',
	      templateUrl: 'templates/menu-channels/views/channel_quick_view.html',
	      controller: 'ChannelQuickViewCtrl',
	      controllerAs: 'cqvc',
	      size: 'lg',
	      resolve: {
	        id: function() {
	          return id;
	        }
	      }
	    });
	}*/
}
