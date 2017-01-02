angular.module("VivoDash").controller('HumidityLineCtrl', ['$scope', HumidityLineCtrl]);

function HumidityLineCtrl ($scope) {
  $scope.labels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  $scope.series = ['Humidity'];
  $scope.data = [
    [65, 48, 55, 45, 60, 53, 57]
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
