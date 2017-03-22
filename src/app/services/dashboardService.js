angular.module('VivoDash')
  .factory('dashboardService', dashboardService);

dashboardService.$inject = ['config', 'basicHttpService'];

function dashboardService(config, basicHttpService) {
  var service = {};
  service.getAllDashboards = getAllDashboards;
  service.getDashboard = getDashboard;
  service.createDashboard = createDashboard;
  service.updateDashboard = updateDashboard;
  service.deleteDashboard = deleteDashboard;

  return service;

  function getAllDashboards() {
    return basicHttpService.httpGet(config.apiAdminDashboards);
  }

  function getDashboard(did) {
    var url = config.apiAdminDashboards + '/' + did;
    return basicHttpService.httpGet(url);
  }

  function createDashboard(data) {
    return basicHttpService.httpPost(config.apiAdminDashboards, data);
  }

  function updateDashboard(did, data) {
    return basicHttpService.httpPut(config.apiAdminDashboards + '/' + did, data);
  }

  function deleteDashboard(did) {
    return basicHttpService.httpDelete(config.apiAdminDashboards + '/' + did);
  }
}
