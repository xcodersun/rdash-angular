angular.module('VivoDash')
	.controller('DashboardWidgetTrendCtrl', ['$scope', '$uibModalInstance', 'channelService', DashboardWidgetTrendCtrl]);

function DashboardWidgetTrendCtrl($scope, $uibModalInstance, channelService) {
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

	channelService.getAllChannels()
	.then(function (channels) {
		for (var i = 0; i < channels.length; i++) {
			var ch = {};
			ch.index = i;
			ch.name = channels[i].name;
			ch.id = channels[i].id;
			$scope.channels.push(ch);
		}
	}).catch(function (e) {
		console.log(e);
	});

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
		channelService.getChannel($scope.channel.id)
		.then(function (channel) {
			$scope.fields = [];
			var fields = channel.fields;
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
