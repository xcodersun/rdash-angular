angular.module('VivoDash')
    .controller('ChannelsNewChannel', ['$scope', '$http', '$cookies', 'config', '$uibModal', ChannelsNewChannel]);

function ChannelsNewChannel($scope, $http, $cookies, config, $uibModal) {
	var cnc = this;
	$scope.fields = {};
	$scope.field_type = "float";

	cnc.addField = function() {
		if (!$scope.fields.hasOwnProperty($scope.field_name)) {
			$scope.fields[$scope.field_name] = $scope.field_type;
		}
		$scope.field_name = "";
	}

	cnc.removeField = function(key) {
		delete $scope.fields[key];
	}

	cnc.submit = function() {
		var channel = {};
		channel["name"] = $scope.name;
		channel["description"] = $scope.description;
		channel["fields"] = $scope.fields;

		var tags = [];
		for (var i = 0; i < $scope.tags.length; i++) {
			tags.push($scope.tags[i]["text"]);
		}
		var access_token = [];
		access_token.push($scope.access_token);
		channel["tags"] = tags;
		channel["access_tokens"] = access_token;
		channel["connection_limits"] = $scope.connection_limits;
		channel["message_rate"] = $scope.connection_limits;

		var data = JSON.stringify(channel);
		console.log(data);

		var authToken = $cookies.getObject('authToken');
		$http({
			url: config.apiAdminChannelsCreate,
			method: 'POST',
			data: data,
			headers: {
				'Authentication': authToken.token
			},
		}).then(success).catch(fail);

		return;

		function success(response) {
			console.log(response);
		}

	    function fail(e) {
	    	console.log(e);
	    }
	    /*var modalInstance = $uibModal.open({
	      animation: true,
	      ariaLabelledBy: 'modal-title',
	      ariaDescribedBy: 'modal-body',
	      templateUrl: 'views/channels_new_channel_create.html',
	      controller: 'ChannelCreateResponse',
	      backdrop: 'static',
	      size: 'lg',
	    });*/
	}
}