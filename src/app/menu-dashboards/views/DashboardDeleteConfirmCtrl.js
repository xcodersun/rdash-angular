angular.module('VivoDash')
  .controller('DashboardDeleteConfirmCtrl', ['dashboard', '$uibModalInstance', 'dashboardService', DashboardDeleteConfirmCtrl]);

function DashboardDeleteConfirmCtrl(dashboard, $uibModalInstance, dashboardService) {
  var ddcc = this;
  ddcc.dashboard = dashboard;

  ddcc.yes = function() {
  	dashboardService.deleteDashboard(ddcc.dashboard.id);
  	$uibModalInstance.close('yes')
  }

  ddcc.no = function() {
    $uibModalInstance.close('no');
  }
}
