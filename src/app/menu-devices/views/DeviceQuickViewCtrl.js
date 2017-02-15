angular.module('VivoDash')
    .controller('DeviceQuickViewCtrl', ['$scope', 'device', 'config', '$cookies', '$http', DeviceQuickViewCtrl]);

function DeviceQuickViewCtrl($scope, device, config, $cookies, $http) {
  var dqvc = this;
  dqvc.device = device;

  var authToken = $cookies.getObject('authToken');
  $scope.charts = [];

  var start = getStart();
  var end = getEnd();

  $http({
    url: config.apiAdminChannels + '/' + dqvc.device.cid,
    method: 'GET',
    headers: {
      'Authentication': authToken.token
    },
  }).then(function (response) {
    dqvc.channel = response.data;
    var fileds_data = [];

    angular.forEach(dqvc.channel.fields, function(value, key) {
      url = constructUrl(config.apiAdminQueryDeviceSeriesNoTags, dqvc.channel.id, dqvc.device.id, key, "avg", start, end);

      authToken = $cookies.getObject('authToken');
      $http({
        url: url,
        method: 'GET',
        headers: {
          'Authentication': authToken.token
        },
      }).then(function (response) {
        var chart = {}
        var data = {};
        // one chart can have multiple data so use dataset
        var dataset = [];
        data["key"] = key;
        data["values"] = [];
        for (var i = 0; i < response.data.length; i++) {
          if (response.data[i]["value"]) {
            data["values"].push([response.data[i]["timestamp"], response.data[i]["value"]]);
          }
        }
        dataset.push(data);
        chart["data"] = dataset;
        chart["option"] = genChartOption('lineChart', key);
        $scope.charts.push(chart);
      }).catch(function (e) {
        // apiAdminQuerySeriesNotTags
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

function genChartOption(type, yAxislabel) {
  chart = {
    chart: {
      type: type,
      height: 200,
      margin : {
        top: 20,
        right: 50,
        bottom: 40,
        left: 100
      },
      x: function(d){ return d[0]; },
      y: function(d){ return d[1]; },
      useInteractiveGuideline: true,
      xAxis: {
        tickFormat: function(d) {
          return d3.time.format('%m/%d/%y %H:%M')(new Date(d));
        },
        rotateLabels: -15
      },
      yAxis: {
        axisLabel: yAxislabel,
        tickFormat: function(d){
            return d3.format('.02f')(d);
        },
      },
      xDomain: [start, end],
    },
  };
  return chart
}

function constructUrl(url, cid, did, field, type, start, end) {
  url = url.replace("%s", cid);
  url = url.replace("%s", did);
  url = url.replace("%s", field);
  url = url.replace("%s", type);

  url = url.replace("%d", start.toString());
  url = url.replace("%d", "");

  url = url.replace("%d", "5400");

  return url
}
