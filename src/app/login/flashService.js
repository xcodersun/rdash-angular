angular.module('VivoDash')
	.factory('FlashService', FlashService);

FlashService.$inject = ['$rootScope'];
function FlashService($rootScope) {
	var service = {};
	service.success = success;
	service.error = error;

	return service;

	function success(message) {
		$rootScope.flash = {
			message: message,
			type: 'success', 
		};
	}

	function error(message) {
		$rootScope.flash = {
			message: message,
			type: 'error',
		};
	}
}