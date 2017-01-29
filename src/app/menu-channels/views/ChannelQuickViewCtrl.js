angular.module('VivoDash')
    .controller('ChannelQuickViewCtrl', ['$scope', 'id', 'config', '$cookies', '$http', ChannelQuickViewCtrl]);

function ChannelQuickViewCtrl($scope, id, config, $cookies, $http) {
  var cqvc = this;
  var authToken = $cookies.getObject('authToken');
  $scope.data = [];

  $http({
    url: config.apiAdminChannels + '/' + id,
    method: 'GET',
    headers: {
      'Authentication': authToken.token
    },
  }).then(function (response) {
    cqvc.channel = response.data;
    console.log(cqvc.channel);
    var fileds_data = [];

    angular.forEach(cqvc.channel["fields"], function(value, key) {
      url = constructUrl(config.apiAdminQuerySeriesNoTags, cqvc.channel["id"], key, "avg");
      console.log(url);

      authToken = $cookies.getObject('authToken');
      $http({
        url: url,
        method: 'GET',
        headers: {
          'Authentication': authToken.token
        },
      }).then(function (response) {
        var data = {};
        data["key"] = key;
        data["values"] = [];
        console.log(response.data);
        for (var i = 0; i < response.data.length; i++) {
          if (response.data[i]["value"]) {
            data["values"].push([response.data[i]["timestamp"], response.data[i]["value"]]);
          }
        }
        console.log(data);

        $scope.data.push(data);

      }).catch(function (e) {
        console.log(e);
      });
    });
  }).catch(function (e) {
    console.log(e);
  });

  $scope.options = {
      chart: {
          type: 'lineChart',
          height: 450,
          margin : {
              top: 20,
              right: 20,
              bottom: 40,
              left: 55
          },
          x: function(d){ return d[0]; },
          y: function(d){ return d[1]; },
          useInteractiveGuideline: true,
          dispatch: {
              stateChange: function(e){ console.log("stateChange"); },
              changeState: function(e){ console.log("changeState"); },
              tooltipShow: function(e){ console.log("tooltipShow"); },
              tooltipHide: function(e){ console.log("tooltipHide"); }
          },
          xAxis: {
              tickFormat: function(d) {
                return d3.time.format('%m/%d/%y %H:%M')(new Date(d));
              },
          },
          yAxis: {
              axisLabel: 'Temperature',
              tickFormat: function(d){
                  return d3.format('.02f')(d);
              },
              axisLabelDistance: -10
          },
          yDomain: [25, 50]
      },
  };
}

function constructUrl(url, id, field, type) {
  url = url.replace("%s", id);
  url = url.replace("%s", field);
  url = url.replace("%s", type);

  date = new Date();
  date.setDate(date.getDate() - date.getDay() + 1);
  date.setHours(0);
  date.setMinutes(0);
  date.setSeconds(0);
  start = Math.floor(date.getTime() / 1000);
  url = url.replace("%d", start.toString());
  url = url.replace("%d", "");

  url = url.replace("%d", "5400");

  return url
}
