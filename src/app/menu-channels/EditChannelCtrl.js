angular.module('VivoDash')
    .controller('EditChannelCtrl', ['$scope', '$http', '$cookies', 'config', '$stateParams', '$state', '$uibModal', EditChannelCtrl]);

function EditChannelCtrl($scope, $http, $cookies, config, $stateParams, $state, $uibModal) {
	var ecc = this;
	$scope.field_empty = false;
	$scope.field_type = "float";
	$scope.field_name = "";
	// for new fields
	$scope.fields = {};

	if (angular.isUndefined($stateParams.id)) {
		var modalInstance = $uibModal.open({
			animation: true,
			ariaLabelledBy: 'modal-title',
			ariaDescribedBy: 'modal-body',
			templateUrl: 'templates/menu-channels/views/edit_channel_warning.html',
			controller: 'EditChannelWarningCtrl',
			controllerAs: 'ecwc',
			backdrop: 'static',
			size: 'sm',
		});
		modalInstance.result.then(function() {
			$state.go('sidebar.channels_summary', {title: 'channel'});
		});
		return;
	}

	var authToken = $cookies.getObject('authToken');
	$http({
		url: config.apiAdminChannels + '/' + $stateParams.id,
		method: 'GET',
		headers: {
			'Authentication': authToken.token
		},
	}).then(function (response) {
		ecc.channel = response.data;
		ecc.channel["description"] = response.data["description"];
		ecc.channel["fields"] = response.data["fields"];
		ecc.channel["tags"] = response.data["tags"];
		ecc.channel["access_tokens"] = response.data["access_tokens"];
		ecc.channel["connection_limit"] = response.data["connection_limit"];
		ecc.channel["message_rate"] = response.data["message_rate"];

	}).catch(function fail(e) {
		console.log(e);
	});

	ecc.addField = function() {
		if (!ecc.channel["fields"].hasOwnProperty($scope.field_name)
			&& !$scope.fields.hasOwnProperty($scope.field_name)) {
			$scope.fields[$scope.field_name] = $scope.field_type;
			$scope.field_empty = false;
		}
		$scope.field_name = "";
	}

	ecc.removeField = function(key) {
		delete $scope.fields[key];
		if (angular.equals($scope.fields, {})) {
			$scope.field_empty = true;
		}
	}

	ecc.submit = function() {
		if (!angular.equals($scope.fields, {})) {
			ecc.channel["fields"] = angular.extend(ecc.channel["fields"], $scope.fields);
		}
		if (ecc.channel["tags"] != undefined) {
			var tags = [];
			for (var i = 0; i < ecc.channel["tags"].length; i++) {
				tags.push(ecc.channel["tags"][i]["text"]);
			}
			ecc.channel["tags"] = tags;
		}
		var data = JSON.stringify(ecc.channel);

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
