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
  service.getChannelConnections = getChannelConnections;

  service.getDefaultSingleTrendUrl = getDefaultSingleTrendUrl;
  service.getCustomSingleTrendUrl = getCustomSingleTrendUrl;

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

  function getChannelConnections(cid) {
    var url = config.apiAdminScanChannelConnections.replace("%s", cid);
    var promise = basicHttpService.httpGet(url)
                  .then(function (connections) {
                    connections.cid = cid;
                    return connections;
                  });
    return promise;
  }

  function getDefaultSingleTrendUrl(cid, field, start, end) {
    var url = config.apiAdminQueryChannelSeriesNoTags;
    url = url.replace("%s", cid);
    url = url.replace("%s", field);
    url = url.replace("%s", "avg");
    url = url.replace("%d", start.toString());
    url = url.replace("%d", end.toString());
    url = url.replace("%d", "5400");
    return url;
  }

  function getCustomSingleTrendUrl(cid, field, type, start, end, interval) {
    var url = config.apiAdminQueryChannelSeriesNoTags;
    url = url.replace("%s", cid);
    url = url.replace("%s", field);
    url = url.replace("%s", type);
    url = url.replace("%d", start.toString());
    url = url.replace("%d", end.toString());
    url = url.replace("%d", interval.toString());
    return url;
  }
}
