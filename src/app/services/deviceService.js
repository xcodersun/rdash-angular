angular.module('VivoDash')
  .factory('deviceService', deviceService);

deviceService.$inject = ['config', 'basicHttpService', 'utilService'];

function deviceService(config, basicHttpService, utilService) {
  var service = {};

  service.getDefaultSingleTrendUrl = getDefaultSingleTrendUrl;
  service.getDeviceStatus = getDeviceStatus;

  return service;

  function getDeviceStatus(cid, did) {
    var url = config.apiAdminDeviceConnectionStatus.replace("%s", cid).replace("%s", did);
    return basicHttpService.httpGet(url);
  }

  function getDefaultSingleTrendUrl(cid, did, field, start, end) {
    var url = config.apiAdminQueryDeviceSeriesNoTags;
    url = url.replace("%s", cid);
    url = url.replace("%s", did);
    url = url.replace("%s", field);
    url = url.replace("%s", "avg");
    url = url.replace("%d", start.toString());
    url = url.replace("%d", end.toString());
    url = url.replace("%d", "5400");
    return url;
  }
}
