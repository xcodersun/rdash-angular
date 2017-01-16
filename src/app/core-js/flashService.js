angular.module('VivoDash')
	.factory('flashService', flashService);

flashService.$inject = ['$rootScope'];
function flashService($rootScope) {
	var service = {};
	service.success = success;
	service.error = error;
	service.clear = clear;

	return service;

	function success(message, status) {
		$rootScope.flash = {
			message: message,
			status: status,
			type: 'success', 
		};
	}

	function error(message, status) {
		$rootScope.flash = {
			message: message,
			status: status,
			type: 'error',
		};
	}

	function clear() {
		delete $rootScope.flash;
	}
}