angular.module('VivoDash')
	.factory('authenticationService', authenticationService);

authenticationService.$inject = ['$http', '$cookies', 'userService'];
function authenticationService($http, $cookies, userService) {
	var service = {};
	service.login = login;
	service.setCredentials = setCredentials;

	return service;

	function login(username, password) {
		var credentials = userService.getCredentials();

		if (username == credentials.username && password == credentials.password) {
			return { success: true };
		} else {
			return { success: false, meesage: 'Username or Password is incorrect' };
		}
	}

	function setCredentials(username, password) {
		currentUser = {
			username: username,
			password: password
		};

		var cookieExp = new Date();
		cookieExp.setSeconds(cookieExp.getSeconds() + 10);
		$cookies.putObject('currentUser', currentUser, {'expires' : cookieExp});
	}
}
