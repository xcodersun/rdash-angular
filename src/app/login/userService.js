angular.module('VivoDash')
	.factory('userService', userService);

function userService() {
	var usersMock = {
		'root': {
			username: 'root',
			password: 'waterISwide',
		},
	}
	var userService = {
		user: undefined,
		login: function(userCredentials) {
			var user = usersMock[userCredentials.username]
			userService.user = (user && (user.password == userCredentials.password)) ?
				user : undefined;
			return user;
		},
		logout: function() {
			userService.user = undefined;
		}
	}

	return userService;
}