angular.module('VivoDash')
    .controller('DevicesSummaryCtrl', ['$http', '$cookies', 'config', '$uibModal', '$state', 'flashService', DevicesSummaryCtrl]);

function DevicesSummaryCtrl($http, $cookies, config, $uibModal, $state, flashService) {
	var dsc = this;
	dsc.devices = [];
	dsc.quickView = quickView;

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
				for (var j = 0; j < connections.length; j++) {
					var device = {};
					device.cid = dsc.channels[i].id;
					device.status = connections[j].status;
					device.id = connections[j].device_id;
					device.ip = connections[j].ip;
					device.channel_name = connections[j].channel_name;
					device.connection_type = connections[j].connection_type;
					device.connected_at = connections[j].connected_at;
					dsc.devices.push(device);
				}
			}).catch(function(e) {
				/* apiAdminScanConnections */
				console.log(e);
				flashService.error(e.data["error"], e.status);
			});
		} /* channel scan ends */
	}).catch(function (e) {
		/* apiAdminChannels */
		console.log(e);
		flashService.error(e.data["error"], e.status);
	});

	return;

	function quickView(device) {
	    var modalInstance = $uibModal.open({
	    	animation: true,
			ariaLabelledBy: 'modal-title',
			ariaDescribedBy: 'modal-body',
			templateUrl: 'templates/menu-devices/views/devices_quick_view.html',
			controller: 'DeviceQuickViewCtrl',
			controllerAs: 'dqvc',
			size: 'lg',
			resolve: {
				device: function() {
					return device;
				}
			}
	    });
	}
}
