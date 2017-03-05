angular.module('VivoDash')
  .factory('chartService', chartService);

chartService.$inject = ['basicHttpService'];

function chartService(basicHttpService) {
  var service = {};
  service.singleTrend = singleTrend;

  return service;

  function singleTrend(url, field) {
    var promise = basicHttpService.httpGet(url)
    .then(function (response) {
      var chart = {}
      var data = {};
      // one chart can have multiple data so use dataset
      var dataset = [];
      data.key = field;
      data.values = [];
      for (var i = 0; i < response.length; i++) {
        if (response[i].value) {
          data.values.push([response[i].timestamp, response[i].value]);
        }
      }
      dataset.push(data);
      chart.data = dataset;
      chart.option = genChartOption('lineChart', field);
      return chart;
    });
    return promise;
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
    return chart;
  }
}