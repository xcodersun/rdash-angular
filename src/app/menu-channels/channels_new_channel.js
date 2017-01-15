angular.module('VivoDash')
    .controller('ChannelsNewChannel', ['$scope', '$http', '$cookies', 'config', '$uibModal', ChannelsNewChannel]);

function ChannelsNewChannel($scope, $http, $cookies, config, $uibModal) {
	var cnc = this;
	$scope.fields = {};
	$scope.field_type = "float";
	cnc.field_empty = true;

	cnc.addField = function() {
		if (!$scope.fields.hasOwnProperty($scope.field_name)) {
			$scope.fields[$scope.field_name] = $scope.field_type;
			cnc.field_empty = false;
		}
		$scope.field_name = "";
	}

	cnc.removeField = function(key) {
		delete $scope.fields[key];
		if (angular.equals($scope.fields, {})) {
			cnc.field_empty = true;
		}
	}

	cnc.submit = function() {
		var channel = {};
		channel["name"] = $scope.name;
		channel["description"] = $scope.description;

		if (angular.equals($scope.fields, {})) {
			cnc.field_empty = true;
			return;
		} else {
			cnc.field_empty = false;
		}
		channel["fields"] = $scope.fields;

		if ($scope.tags != undefined) {
			var tags = [];
			for (var i = 0; i < $scope.tags.length; i++) {
				tags.push($scope.tags[i]["text"]);
			}
			channel["tags"] = tags;
		}
		var access_token = [];
		access_token.push($scope.access_token);
		channel["access_tokens"] = access_token;
		channel["connection_limit"] = $scope.connection_limit;
		channel["message_rate"] = $scope.message_rate;

		var data = JSON.stringify(channel);
		console.log(data);

		var authToken = $cookies.getObject('authToken');
		$http({
			url: config.apiAdminChannels,
			method: 'POST',
			data: data,
			headers: {
				'Authentication': authToken.token
			},
		}).then(success).catch(fail);

		return;

		function success(response) {
			console.log(response);
			delete $scope.error;
			var modalInstance = $uibModal.open({
				animation: true,
				ariaLabelledBy: 'modal-title',
				ariaDescribedBy: 'modal-body',
				templateUrl: 'views/channels_new_channel_create.html',
				controller: 'ChannelCreateResponse',
				backdrop: 'static',
				size: 'lg',
		    });
		}

		function fail(e) {
			// The only case that fails to create channel now
			e.data["error"] = "Channel name already exists."
			$scope.error = e;
		}
	}
}
