angular.module('VivoDash')
  .factory('statsService', statsService);

statsService.$inject = ['config', 'basicHttpService'];

function statsService(config, basicHttpService) {
  var service = {};
  service.getSummary = getSummary;

  return service;

  function getSummary() {
    return basicHttpService.httpGet(config.apiAdminSummary);
  }
}
