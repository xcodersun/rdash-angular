angular.module('VivoDash')
  .factory('channelService', channelService);

channelService.$inject = ['config', 'basicHttpService'];

function channelService(config, basicHttpService) {
  var service = {};
  service.getAllChannels = getAllChannels;
  service.getChannel = getChannel;
  service.createChannel = createChannel;
  service.updateChannel = updateChannel;
  service.deleteChannel = deleteChannel;
  service.getUrl = getUrl;

  return service;

  function getAllChannels() {
    return basicHttpService.httpGet(config.apiAdminChannels);
  }

  function getChannel(cid) {
    var url = config.apiAdminChannels + '/' + cid;
    return basicHttpService.httpGet(url);
  }

  function createChannel(data) {
    return basicHttpService.httpPost(config.apiAdminChannels, data);
  }

  function updateChannel(cid, data) {
    var url = config.apiAdminChannels + '/' + cid;
    return basicHttpService.httpPut(url, data);
  }

  function deleteChannel(cid) {
    var url = config.apiAdminChannels + '/' + cid + "?with_indices=true";
    return basicHttpService.httpDelete(url);
  }

  function getUrl(url, id, field, type, start, end, interval) {
    url = url.replace("%s", id);
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