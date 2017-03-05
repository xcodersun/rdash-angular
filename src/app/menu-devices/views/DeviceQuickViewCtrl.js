angular.module('VivoDash')
  .controller('DeviceQuickViewCtrl', ['$scope', 'device', 'channelService', 'deviceService', 'chartService', 'utilService', DeviceQuickViewCtrl]);

function DeviceQuickViewCtrl($scope, device, channelService, deviceService, chartService, utilService) {
  var dqvc = this;
  dqvc.device = device;
  $scope.charts = [];
  var start = utilService.getDateFromNow(-7, 'start');
  var end = utilService.getDateFromNow(0, 'end');

  channelService.getChannel(dqvc.device.cid)
  .then(function (channel) {
    dqvc.channel = channel;
    var fileds_data = [];

    angular.forEach(dqvc.channel.fields, function(value, key) {
      var url = deviceService.getDefaultSingleTrendUrl(dqvc.channel.id, dqvc.device.id, key, start, end);

      chartService.singleTrend(url, key, start, end)
      .then(function (chart) {
        $scope.charts.push(chart);
      }).catch(function (e) {
        console.log(e);
      });
    });
  }).catch(function (e) {
    // apiAdminChannels
    console.log(e);
  });
}
