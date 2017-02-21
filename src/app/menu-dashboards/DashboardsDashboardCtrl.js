angular.module('VivoDash')
    .controller('DashboardsDashboardCtrl', ['$uibModal', '$state', DashboardsDashboardCtrl]);

function DashboardsDashboardCtrl($uibModal, $state) {
  var ddc = this;

  ddc.open = function () {
    var modalInstance = $uibModal.open({
      animation: true,
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',
      templateUrl: 'templates/menu-dashboards/widgets/dashboard_widget_trend.html',
      controller: 'DashboardWidgetTrendCtrl',
      controllerAs: 'dwtc',
      backdrop: 'static',
      size: 'lg',
    });
    modalInstance.result.then(function() {
      var res = modalInstance.result.$$state.value;
      if (res === 'create') {
        $state.go('sidebar.dashboards_summary', {title: 'dashboards'});
      }
    });
  };
}
