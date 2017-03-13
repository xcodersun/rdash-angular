angular.module('VivoDash')
  .factory('dashboardService', dashboardService);

dashboardService.$inject = ['config', 'basicHttpService'];

function dashboardService(config, basicHttpService) {
  var service = {};
  service.createDashboard = createDashboard;

  return service;

  function createDashboard(data) {
    return basicHttpService.httpPost(config.apiAdminDashboards, data);
  }
}
