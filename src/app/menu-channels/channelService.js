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
}