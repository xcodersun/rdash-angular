angular.module('VivoDash')
  .factory('deviceService', deviceService);

deviceService.$inject = ['config', 'basicHttpService'];

function deviceService(config, basicHttpService) {
  var service = {};

  service.getUrl = getUrl;

  return service;

  function getUrl(url, cid, did, field, type, start, end, interval) {
    url = url.replace("%s", cid);
    url = url.replace("%s", did);
    url = url.replace("%s", field);
    url = url.replace("%s", type);
    url = url.replace("%d", start.toString());
    if (end == -1) {
      url = url.replace("%d", "");
    } else {
      url = url.replace("%d", end.toString());
    }
    url = url.replace("%d", interval.toString());
    return url;
  }
}