angular.module('VivoDash')
    .controller('ViewChannelCtrl', ['$scope', '$http', '$cookies', 'config', '$stateParams', '$state', ViewChannelCtrl]);

function ViewChannelCtrl($scope, $http, $cookies, config, $stateParams, $state) {
	var vcc = this;
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
		vcc.channel = response.data;
		vcc.channel["description"] = response.data["description"];
		vcc.channel["fields"] = response.data["fields"];
		vcc.channel["tags"] = response.data["tags"];
		vcc.channel["access_tokens"] = response.data["access_tokens"];
		vcc.channel["connection_limit"] = response.data["connection_limit"];
		vcc.channel["message_rate"] = response.data["message_rate"];

	}).catch(function fail(e) {
		console.log(e);
	});

	vcc.addField = function() {
		if (!vcc.channel["fields"].hasOwnProperty($scope.field_name)
			&& !$scope.fields.hasOwnProperty($scope.field_name)) {
			$scope.fields[$scope.field_name] = $scope.field_type;
			$scope.field_empty = false;
		}
		$scope.field_name = "";
	}

	vcc.removeField = function(key) {
		delete $scope.fields[key];
		if (angular.equals($scope.fields, {})) {
			$scope.field_empty = true;
		}
	}

	vcc.submit = function() {
		if (!angular.equals($scope.fields, {})) {
			vcc.channel["fields"] = angular.extend(vcc.channel["fields"], $scope.fields);
		}
		if (vcc.channel["tags"] != undefined) {
			var tags = [];
			for (var i = 0; i < vcc.channel["tags"].length; i++) {
				tags.push(vcc.channel["tags"][i]["text"]);
			}
			vcc.channel["tags"] = tags;
		}
		var data = JSON.stringify(vcc.channel);

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
