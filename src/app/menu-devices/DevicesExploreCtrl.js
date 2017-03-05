angular.module('VivoDash')
  .controller('DevicesExploreCtrl', ['$scope', '$stateParams', '$state', '$uibModal', 'channelService', 'deviceService', 'chartService', 'utilService', DevicesExploreCtrl]);

function DevicesExploreCtrl($scope, $stateParams, $state, $uibModal, channelService, deviceService, chartService, utilService) {
  var dec = this;
  var cid = $stateParams.cid;
  var did = $stateParams.did;
  $scope.charts = [];
  var start = utilService.getDateFromNow(-7, 'start');
  var end = utilService.getDateFromNow(0, 'end');

  // No device found
  if (angular.isUndefined(cid) || angular.isUndefined(did)) {
    var modalInstance = $uibModal.open({
      animation: true,
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',
      templateUrl: 'templates/menu-devices/views/devices_explore_warning.html',
      controller: 'DevicesExploreWarningCtrl',
      controllerAs: 'dewc',
      backdrop: 'static',
      size: 'sm',
    });
    modalInstance.result.then(function() {
      $state.go('sidebar.devices_summary', {title: 'channel'});
    });
    return;
  }

  deviceService.getDeviceStatus(cid, did)
  .then(function (device) {
    dec.device = device;

    channelService.getChannel(cid)
    .then(function (channel) {
      dec.channel = channel;
      var fileds_data = [];

      angular.forEach(dec.channel.fields, function(value, key) {
        url = deviceService.getDefaultSingleTrendUrl(cid, did, key, start, end);

        chartService.singleTrend(url, key, start, end)
        .then(function (chart) {
          $scope.charts.push(chart);
        }).catch(function (e) {
          console.log(e);
        });
      });
    }).catch(function (e) {
      console.log(e);
    });
  });

  return
}
