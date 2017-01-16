angular.module('VivoDash')
    .controller('DeleteChannelCtrl', ['$uibModalInstance', '$http', '$cookies', 'channel', 'config', DeleteChannelCtrl]);

function DeleteChannelCtrl($uibModalInstance, $http, $cookies, channel, config) {
	var dcc = this;
	dcc.name = channel.name;

	dcc.ok = function () {
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

	dcc.close = function() {
		$uibModalInstance.close('');
	}
}