angular.module('VivoDash')
    .controller('ChannelsSummaryDelete', ['$uibModalInstance', '$http', '$cookies', 'channel', 'config', ChannelsSummaryDelete]);

function ChannelsSummaryDelete($uibModalInstance, $http, $cookies, channel, config) {
	var csd = this;
	csd.name = channel.name;

	csd.ok = function () {
		var authToken = $cookies.getObject('authToken');
		$http({
			url: config.apiAdminChannels + '/' + channel.id + "?with_indices=true",
			method: 'DELETE',
			headers: {
				'Authentication': authToken.token
			},
		}).then(success).catch(fail);

		function success(response) {
			$uibModalInstance.close('');
		}

		function fail(e) {
			console.log(e);
		}
	};

	csd.close = function() {
		$uibModalInstance.close('');
	}
}