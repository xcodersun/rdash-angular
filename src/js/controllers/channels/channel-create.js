angular.module('VivoDash')
    .controller('ChannelCreate', ['$uibModal', '$log', '$document', ChannelCreate]);

function ChannelCreate($uibModal, $log, $document) {
  var $ctrl = this;
  $ctrl.animationsEnabled = true;

  $ctrl.open = function (size) {
    var modalInstance = $uibModal.open({
      animation: $ctrl.animationsEnabled,
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',
      templateUrl: 'views/channels_new_channel_create.html',
      controller: 'ChannelCreateResponse',
      backdrop: 'static',
      size: size,
    });
  };
}
