angular.module('VivoDash')
  .controller('ChannelCreateResponse', ['$scope', '$uibModalInstance', ChannelCreateResponse]);

function ChannelCreateResponse($scope, $uibModalInstance) {
  $scope.ok = function () {
    $uibModalInstance.close('');
    window.location = "#/channels_summary";
  };
}