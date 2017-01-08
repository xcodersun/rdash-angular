angular.module('VivoDash')
	.factory('authenticationService', authenticationService);

authenticationService.$inject = ['$http', '$cookies', 'base64Service', 'config'];
function authenticationService($http, $cookies, base64Service, config) {
	var service = {};
	service.login = login;
	service.setCredentials = setCredentials;

	return service;

	function login(username, password) {
		var authdata = base64Service.encode(username + ':' + password);
		return $http({
			url: config.apiAdminLogin,
			method: 'GET',
			headers: {
				'Authorization':'Basic ' + authdata
			},
		})
	}

	function setCredentials(token, expires) {
		var authToken = {
			token: token,
			expires: expires,
		}
		var cookieExp = new Date(expires);
		$cookies.putObject('authToken', authToken, {'expires' : cookieExp});
	}
}
