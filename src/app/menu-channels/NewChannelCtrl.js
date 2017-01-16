angular.module('VivoDash')
    .controller('NewChannelCtrl', ['$scope', '$http', '$cookies', 'config', '$uibModal', 'flashService', NewChannelCtrl]);

function NewChannelCtrl($scope, $http, $cookies, config, $uibModal, flashService) {
	var ncc = this;
	$scope.fields = {};
	$scope.field_type = "float";
	ncc.field_empty = true;

	ncc.addField = function() {
		if (!$scope.fields.hasOwnProperty($scope.field_name)) {
			$scope.fields[$scope.field_name] = $scope.field_type;
			ncc.field_empty = false;
		}
		$scope.field_name = "";
	}

	ncc.removeField = function(key) {
		delete $scope.fields[key];
		if (angular.equals($scope.fields, {})) {
			ncc.field_empty = true;
		}
	}

	ncc.submit = function() {
		var channel = {};
		channel["name"] = $scope.name;
		channel["description"] = $scope.description;

		if (angular.equals($scope.fields, {})) {
			ncc.field_empty = true;
			return;
		} else {
			ncc.field_empty = false;
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
			flashService.clear();
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
			console.log(e);
			flashService.error(e.data["error"], e.status);
		}
	}
}
