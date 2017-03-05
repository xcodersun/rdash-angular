angular.module('VivoDash')
  .controller('ChannelQuickViewCtrl', ['$scope', 'id', 'basicHttpService', 'channelService', 'chartService', 'utilService', ChannelQuickViewCtrl]);

function ChannelQuickViewCtrl($scope, id, basicHttpService, channelService, chartService, utilService) {
  var cqvc = this;
  $scope.charts = [];
  var start = utilService.getDateFromNow(-7, 'start');
  var end = utilService.getDateFromNow(0, 'end');

  channelService.getChannel(id)
  .then(function (response) {
    cqvc.channel = response;
    var fileds_data = [];

    angular.forEach(cqvc.channel["fields"], function(value, key) {
      url = channelService.getDefaultSingleTrendUrl(cqvc.channel["id"], key, start, end);

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
}
