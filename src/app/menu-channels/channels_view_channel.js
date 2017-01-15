angular.module('VivoDash')
    .controller('ChannelsViewCtrl', ['$scope', '$http', '$cookies', 'config', '$stateParams', '$state', ChannelsViewCtrl]);

function ChannelsViewCtrl($scope, $http, $cookies, config, $stateParams, $state) {
	var cvc = this;
	$scope.field_empty = false;
	$scope.field_type = "float";
	$scope.field_name = "";
	// for new fields
	$scope.fields = {};

	var authToken = $cookies.getObject('authToken');
	$http({
		url: config.apiAdminChannels + '/' + $stateParams.id,
		method: 'GET',
		headers: {
			'Authentication': authToken.token
		},
	}).then(function (response) {
		cvc.channel = response.data;
		cvc.channel["description"] = response.data["description"];
		cvc.channel["fields"] = response.data["fields"];
		cvc.channel["tags"] = response.data["tags"];
		cvc.channel["access_tokens"] = response.data["access_tokens"];
		cvc.channel["connection_limit"] = response.data["connection_limit"];
		cvc.channel["message_rate"] = response.data["message_rate"];

	}).catch(function fail(e) {
		console.log(e);
	});

	cvc.addField = function() {
		if (!cvc.channel["fields"].hasOwnProperty($scope.field_name)
			&& !$scope.fields.hasOwnProperty($scope.field_name)) {
			$scope.fields[$scope.field_name] = $scope.field_type;
			$scope.field_empty = false;
		}
		$scope.field_name = "";
	}

	cvc.removeField = function(key) {
		delete $scope.fields[key];
		if (angular.equals($scope.fields, {})) {
			$scope.field_empty = true;
		}
	}

	cvc.submit = function() {
		if (!angular.equals($scope.fields, {})) {
			cvc.channel["fields"] = angular.extend(cvc.channel["fields"], $scope.fields);
		}
		if (cvc.channel["tags"] != undefined) {
			var tags = [];
			for (var i = 0; i < cvc.channel["tags"].length; i++) {
				tags.push(cvc.channel["tags"][i]["text"]);
			}
			cvc.channel["tags"] = tags;
		}
		var data = JSON.stringify(cvc.channel);

		authToken = $cookies.getObject('authToken');
		$http({
			url: config.apiAdminChannels + '/' + $stateParams.id,
			method: 'PUT',
			data: data,
			headers: {
				'Authentication': authToken.token
			},
		}).then(function (response) {
			$state.reload();
		}).catch(function (e) {
			console.log(e);
		});
	}
}