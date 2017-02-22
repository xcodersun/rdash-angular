angular.module('VivoDash')
	.controller('DashboardWidgetTrendCtrl', ['$scope', '$uibModalInstance', '$http', '$cookies', 'config', DashboardWidgetTrendCtrl]);

function DashboardWidgetTrendCtrl($scope, $uibModalInstance, $http, $cookies, config) {
	var dwtc = this;
	$scope.channels = [];
	$scope.fields = [];
	dwtc.channel = {};

	var authToken = $cookies.getObject('authToken');
	$http({
		url: config.apiAdminChannels,
		method: 'GET',
		headers: {
			'Authentication': authToken.token
		}
	}).then(function (response) {
		var channels = response.data;
		for (var i = 0; i < channels.length; i++) {
			var ch = {};
			ch.index = i;
			ch.name = channels[i].name;
			ch.id = channels[i].id;
			$scope.channels.push(ch);
		}
	}).catch(function (e) {
		console.log(e);
	})

	dwtc.create = function () {
		$uibModalInstance.close('create');
	}

	dwtc.cancel = function() {
		console.log(dwtc.channel);
		console.log(dwtc.field);
		$uibModalInstance.close('cancel');
	}

	dwtc.channelSelected = function() {
		$http({
			url: config.apiAdminChannels + '/' + dwtc.channel.id,
			method: 'GET',
			headers: {
				'Authentication': authToken.token
			},
		}).then(function (response) {
			$scope.fields = [];
			var fields = response.data.fields;
			var i = 0;
			angular.forEach(fields, function(value, key) {
				var field = {};
				field.index = i++;
				field.name = key;
				$scope.fields.push(field);
			});
		})
	}
}
