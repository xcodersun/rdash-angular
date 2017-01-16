angular.module('VivoDash')
    .controller('EditChannelCtrl', ['$scope', '$http', '$cookies', 'config', '$stateParams', '$state', '$uibModal', 'flashService', EditChannelCtrl]);

function EditChannelCtrl($scope, $http, $cookies, config, $stateParams, $state, $uibModal, flashService) {
	var ecc = this;
	$scope.field_empty = false;
	$scope.field_type = "float";
	$scope.field_name = "";
	// for new fields and tags
	$scope.fields = {};
	$scope.tags = [];

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

	}).catch(function (e) {
		console.log(e);
		flashService.error(e.data["error"], e.status);
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

	ecc.addTag = function() {
		if (ecc.channel["tags"].indexOf($scope.tag_name) === -1
			&& $scope.tags.indexOf($scope.tag_name) === -1) {
			$scope.tags.push($scope.tag_name);
		}
		$scope.tag_name = "";
	}

	ecc.removeTag = function(index) {
		if ($scope.tags.length > 0) {
			$scope.tags.splice(index, 1);
		}
	}

	ecc.submit = function() {
		if (!angular.equals($scope.fields, {})) {
			ecc.channel["fields"] = angular.extend(ecc.channel["fields"], $scope.fields);
			$scope.fields = {};
		} else {
			delete ecc.channel["fields"];
		}
		if ($scope.tags.length > 0) {
			for (var i = 0; i < $scope.tags.length; i++) {
				ecc.channel["tags"].push($scope.tags[i]);
			}
			$scope.tags = [];
		} else {
			delete ecc.channel["tags"];
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
			flashService.success("Success! Channel is updated!", response.status);
		}).catch(function (e) {
			console.log(e);
			flashService.error(e.data["error"], e.status);
		});
	}
}
