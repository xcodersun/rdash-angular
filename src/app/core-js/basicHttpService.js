angular.module('VivoDash')
	.factory('basicHttpService', basicHttpService);

basicHttpService.$inject = ['$http', '$cookies'];

function basicHttpService($http, $cookies) {
	var service = {};
	service.httpGet = httpGet;
	service.httpPost = httpPost;
	service.httpPut = httpPut;
	service.httpDelete = httpDelete;

	return service;

	function httpGet(url) {
		var authToken = $cookies.getObject('authToken');
		var promise = $http({
			url: url,
			method: 'GET',
			headers: {
				'Authentication': authToken.token,
			},
		}).then(function (response) {
			return response.data;
		});
		return promise;
	}

	function httpPost(url, payload) {
		var authToken = $cookies.getObject('authToken');
		var promise = $http({
			url: url,
			method: 'POST',
			data: payload,
			headers: {
				'Authentication': authToken.token,
			},
		}).then(function (response) {
			return response.data;
		});
		return promise;
	}

	function httpPut(url, payload) {
		var authToken = $cookies.getObject('authToken');
		var promise = $http({
			url: url,
			method: 'PUT',
			data: payload,
			headers: {
				'Authentication': authToken.token,
			},
		}).then(function (response) {
			return response.data;
		});
		return promise;
	}

	function httpDelete(url) {
		var authToken = $cookies.getObject('authToken');
		var promise = $http({
			url: url,
			method: 'DELETE',
			headers: {
				'Authentication': authToken.token,
			},
		}).then(function (response) {
			return response.data;
		});
		return promise;
	}
}