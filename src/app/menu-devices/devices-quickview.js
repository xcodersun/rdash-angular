angular.module('VivoDash')
    .controller('DeviceQuickView', ['$uibModal', '$log', '$document', DeviceQuickView]);

function DeviceQuickView($uibModal, $log, $document) {
  var $ctrl = this;
  $ctrl.animationsEnabled = true;

  $ctrl.open = function (size) {
    var modalInstance = $uibModal.open({
      animation: $ctrl.animationsEnabled,
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',
      templateUrl: 'views/devices_quick_view.html',
      size: size,
    });
  };
}
