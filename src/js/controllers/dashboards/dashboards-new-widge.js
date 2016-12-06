angular.module('VivoDash')
    .controller('DashboardNewWidge', ['$uibModal', '$log', '$document', DashboardNewWidge]);

function DashboardNewWidge($uibModal, $log, $document) {
  var $ctrl = this;
  $ctrl.animationsEnabled = true;

  $ctrl.open = function (size) {
    var modalInstance = $uibModal.open({
      animation: $ctrl.animationsEnabled,
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',
      templateUrl: 'views/dashboards_new_widge.html',
      controller: 'DashboardCreateResponse',
      backdrop: 'static',
      size: size,
    });
  };
}
