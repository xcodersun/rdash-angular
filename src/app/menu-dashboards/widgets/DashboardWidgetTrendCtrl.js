angular.module('VivoDash')
	.controller('DashboardWidgetTrendCtrl', ['$scope', '$uibModalInstance', '$http', '$cookies', 'config', DashboardWidgetTrendCtrl]);

function DashboardWidgetTrendCtrl($scope, $uibModalInstance, $http, $cookies, config) {
	var dwtc = this;
	$scope.channels = [];
	$scope.fields = [];
	$scope.time_ranges = [{
		index: 0,
		label: "1 days",
		value: 86400,
	}, {
		index: 1,
		label: "3 days",
		value: 259200,
	}, {
		index: 2,
		label: "7 days",
		value: 604800,
	}];
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
		console.log($scope.channel);
		console.log($scope.field);
		console.log($scope.time_range);
		console.log($scope.interval);
		$uibModalInstance.close('cancel');
	}

	dwtc.channelSelected = function() {
		$http({
			url: config.apiAdminChannels + '/' + $scope.channel.id,
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

	dwtc.timeRangeSelected = function() {
		switch ($scope.time_range.index) {
			case 0:
				$scope.intervals = [{
					index: 0,
					label: "15 mins",
					value: 900,
				}, {
					index: 1,
					label: "30 mins",
					value: 1800,
				}, {
					index: 2,
					label: "60 mins",
					value: 3600,
				}];
				break;
			case 1:
				$scope.intervals = [{
					index: 0,
					label: "30 mins",
					value: 1800,
				}, {
					index: 1,
					label: "60 mins",
					value: 3600,
				}, {
					index: 2,
					label: "90 mins",
					value: 5400,
				}];
				break;
			case 2:
				$scope.intervals = [{
					index: 0,
					label: "90 mins",
					value: 5400,
				}, {
					index: 1,
					label: "3 hrs",
					value: 10800,
				}, {
					index: 2,
					label: "6 hrs",
					value: 21600,
				}];
				break;
		}
	}
}
