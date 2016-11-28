angular.module('VivoDash')
    .controller('ChannelsModalCtrl', ['$uibModal', '$log', '$document', ChannelsModalCtrl]);

function ChannelsModalCtrl($uibModal, $log, $document) {
  var $ctrl = this;
  $ctrl.animationsEnabled = true;

  $ctrl.open = function (size) {
    var modalInstance = $uibModal.open({
      animation: $ctrl.animationsEnabled,
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',
      templateUrl: 'views/channels_quick_view.html',
      size: size,
    });
  };
}
