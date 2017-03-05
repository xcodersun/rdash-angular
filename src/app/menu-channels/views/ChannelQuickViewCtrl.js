angular.module('VivoDash')
  .controller('ChannelQuickViewCtrl', ['$scope', 'id', 'config', 'basicHttpService', 'channelService', 'chartService', ChannelQuickViewCtrl]);

function ChannelQuickViewCtrl($scope, id, config, basicHttpService, channelService, chartService) {
  var cqvc = this;
  $scope.charts = [];

  var start = getStart();
  var end = getEnd();

  channelService.getChannel(id)
  .then(function (response) {
    cqvc.channel = response;
    var fileds_data = [];

    angular.forEach(cqvc.channel["fields"], function(value, key) {
      url = channelService.getUrl(config.apiAdminQuerySeriesNoTags, cqvc.channel["id"], key, "avg", start, end, 5400);

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
