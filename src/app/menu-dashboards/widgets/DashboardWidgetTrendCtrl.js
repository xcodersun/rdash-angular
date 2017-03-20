angular.module('VivoDash')
  .controller('DashboardWidgetTrendCtrl', ['$scope', '$uibModalInstance', 'dashboard', 'channelService', 'dashboardService', 'flashService', DashboardWidgetTrendCtrl]);

function DashboardWidgetTrendCtrl($scope, $uibModalInstance, dashboard, channelService, dashboardService, flashService) {
  var dwtc = this;
  $scope.channels = [];
  $scope.fields = [];
  $scope.time_ranges = [{
    label: "1 days",
    value: 86400,
    intervals: [{
      label: "15 mins",
      value: 900,
    }, {
      label: "30 mins",
      value: 1800,
    }, {
      label: "60 mins",
      value: 3600,
    }],
  }, {
    label: "3 days",
    value: 259200,
    intervals: [{
      label: "30 mins",
      value: 1800,
    }, {
      label: "60 mins",
      value: 3600,
    }, {
      label: "90 mins",
      value: 5400,
    }],
  }, {
    label: "7 days",
    value: 604800,
    intervals: [{
      label: "90 mins",
      value: 5400,
    }, {
      label: "3 hrs",
      value: 10800,
    }, {
      label: "6 hrs",
      value: 21600,
    }],
  }];

  // For dashboard edition
  var definition;
  if (!angular.isUndefined(dashboard)) {
    definition = angular.fromJson(dashboard.definition);
    $scope.name = dashboard.name;
    $scope.description = dashboard.description;
  }

  channelService.getAllChannels()
  .then(function (channels) {
    for (var i = 0; i < channels.length; i++) {
      var ch = {};
      ch.index = i;
      ch.name = channels[i].name;
      ch.id = channels[i].id;
      $scope.channels.push(ch);
      // For dashboard edition
      if (!angular.isUndefined(definition) && ch.id == definition.channel_id) {
        $scope.channel = ch;
        for (var i = 0; i < $scope.time_ranges.length; i++) {
          if ($scope.time_ranges[i].value == definition.time_range) {
            $scope.time_range = $scope.time_ranges[i];
            for (var j = 0; j < $scope.time_ranges[i].intervals.length; j++) {
              if ($scope.time_ranges[i].intervals[j].value == definition.interval) {
                $scope.interval = $scope.time_ranges[i].intervals[j];
                break;
              }
            }
            break;
          }
        }
        dwtc.channelSelected();
        dwtc.timeRangeSelected();
      }
    }
  }).catch(function (e) {
    console.log(e);
  });

  dwtc.channelSelected = function() {
    channelService.getChannel($scope.channel.id)
    .then(function (channel) {
      $scope.fields = [];
      var fields = channel.fields;
      var i = 0;
      angular.forEach(fields, function(value, key) {
        var field = {};
        field.index = i++;
        field.name = key;
        $scope.fields.push(field);
        if (!angular.isUndefined(definition) && field.name == definition.field) {
          $scope.field = field;
        }
      });
    })
  }

  dwtc.timeRangeSelected = function() {
    switch ($scope.time_range.value) {
      case 86400:
        $scope.intervals = $scope.time_ranges[0].intervals;
        break;
      case 259200:
        $scope.intervals = $scope.time_ranges[1].intervals;
        break;
      case 604800:
        $scope.intervals = $scope.time_ranges[2].intervals;
        break;
    }
  }

  dwtc.create = function () {
    dwtc.channel = {};
    dwtc.channel.channel_id = $scope.channel.id;
    dwtc.channel.channel_name = $scope.channel.name;
    dwtc.channel.field = $scope.field.name;
    dwtc.channel.time_range = $scope.time_range.value;
    dwtc.channel.interval = $scope.interval.value;

    dwtc.dashboard = {};
    dwtc.dashboard.name = $scope.name;
    dwtc.dashboard.description = $scope.description;
    dwtc.dashboard.definition = angular.toJson(dwtc.channel);

    console.log(dwtc.dashboard);
    var data = angular.toJson(dwtc.dashboard);
    dashboardService.createDashboard(data)
    .then(function (response) {
      console.log(response);
      $uibModalInstance.close('create');
    }).catch(function (e) {
      console.log(e);
      flashService.error(e.data.error);
    });
  }

  dwtc.cancel = function() {
    $uibModalInstance.close('cancel');
  }
}
