angular.module('VivoDash')
	.factory('userService', userService);

function userService() {
	var service = {};
	service.getCredentials = getCredentials;

	return service;

	function getCredentials() {
		var usersMock = {
			username: 'root',
			password: 'waterISwide',
		}
		return usersMock;
	}
}
