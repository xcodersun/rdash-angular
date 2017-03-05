angular.module('VivoDash')
  .factory('flashService', flashService);

flashService.$inject = ['$rootScope'];
function flashService($rootScope) {
  var service = {};
  service.success = success;
  service.error = error;
  service.clear = clear;

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

  function clear() {
    delete $rootScope.flash;
  }
}