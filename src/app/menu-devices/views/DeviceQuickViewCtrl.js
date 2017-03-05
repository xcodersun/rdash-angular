angular.module('VivoDash')
  .controller('DeviceQuickViewCtrl', ['$scope', 'device', 'config', 'channelService', 'deviceService', 'chartService', DeviceQuickViewCtrl]);

function DeviceQuickViewCtrl($scope, device, config, channelService, deviceService, chartService) {
  var dqvc = this;
  dqvc.device = device;
  $scope.charts = [];

  var start = getStart();
  var end = getEnd();

  channelService.getChannel(dqvc.device.cid)
  .then(function (channel) {
    dqvc.channel = channel;
    var fileds_data = [];

    angular.forEach(dqvc.channel.fields, function(value, key) {
      url = deviceService.getUrl(config.apiAdminQueryDeviceSeriesNoTags, dqvc.channel.id, dqvc.device.id, key, "avg", start, end, 5400);
      chartService.singleTrend(url, key)
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
