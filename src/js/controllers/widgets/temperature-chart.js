angular.module("VivoDash").controller('TemperatureCtrl', ['$scope', TemperatureCtrl]);

function TemperatureCtrl ($scope) {
  $scope.labels = ["Monday", "Tuesday", "Thursday", "Friday", "Saturday", "Sunday"];
  $scope.series = ['Temperature'];
  $scope.data = [
    [21, 18, 16, 17, 20, 23, 21]
  ];
  $scope.onClick = function (points, evt) {
    console.log(points, evt);
  };
  $scope.datasetOverride = [{ yAxisID: 'y-axis-1' }];
  $scope.options = {
    scales: {
      yAxes: [
        {
          id: 'y-axis-1',
          type: 'linear',
          display: true,
          position: 'left'
        }
      ]
    }
  };
}
