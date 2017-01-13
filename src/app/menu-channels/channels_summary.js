angular.module('VivoDash')
    .controller('ChannelsSummaryCtrl', ['$http', '$cookies', 'config', ChannelsSummaryCtrl]);

function ChannelsSummaryCtrl($http, $cookies, config) {
	var csc = this;
	csc.channels = {};

	var authToken = $cookies.getObject('authToken');

	$http({
		url: config.apiAdminChannelsSummary,
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
}