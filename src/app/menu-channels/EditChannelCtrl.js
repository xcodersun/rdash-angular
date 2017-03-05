angular.module('VivoDash')
  .controller('EditChannelCtrl', ['$scope', 'config', '$stateParams', '$state', '$uibModal', 'flashService', 'channelService', EditChannelCtrl]);

function EditChannelCtrl($scope, config, $stateParams, $state, $uibModal, flashService, channelService) {
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

  channelService.getChannel($stateParams.id)
  .then(function (response) {
    ecc.channel = response;
  }).catch(function (e) {
    console.log(e);
    flashService.error(e.data.error);
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

    channelService.updateChannel($stateParams.id, data)
    .then(function (response) {
      $state.reload();
      flashService.success("Success! Channel is updated!");
    }).catch(function (e) {
      $state.reload();
      console.log(e);
      flashService.error(e.data.error);
    });
  }
}
