angular.module('VivoDash')
  .controller('DevicesExploreCtrl', ['$scope', 'config', '$stateParams', '$state', '$uibModal', 'channelService', 'deviceService', 'chartService', DevicesExploreCtrl]);

function DevicesExploreCtrl($scope, config, $stateParams, $state, $uibModal, channelService, deviceService, chartService) {
  var dec = this;
  var cid = $stateParams.cid;
  var did = $stateParams.did;
  $scope.charts = [];

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
    var start = getStart();
    var end = getEnd();

    channelService.getChannel(cid)
    .then(function (channel) {
      dec.channel = channel;
      var fileds_data = [];

      angular.forEach(dec.channel.fields, function(value, key) {
        url = deviceService.getUrl(config.apiAdminQueryDeviceSeriesNoTags, cid, did, key, "avg", start, end, 5400);
        chartService.singleTrend(url, key)
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

function getStart() {
  date = new Date();
  date.setDate(date.getDate() -  7);
  date.setHours(0);
  date.setMinutes(0);
  date.setSeconds(0);
  start = Math.floor(date.getTime());
  return start;
}

function getEnd() {
  date = new Date();
  date.setDate(date.getDate());
  date.setHours(23);
  date.setMinutes(59);
  date.setSeconds(59);
  end = Math.floor(date.getTime());
  return end;
}
