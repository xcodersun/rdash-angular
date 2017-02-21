angular.module('VivoDash')
    .controller('DashboardWidgetTrendCtrl', ['$uibModalInstance', DashboardWidgetTrendCtrl]);

function DashboardWidgetTrendCtrl($uibModalInstance) {
  var dwtc = this;

  dwtc.create = function () {
    $uibModalInstance.close('create');
  }

  dwtc.cancel = function() {
    $uibModalInstance.close('cancel');
  }
}
