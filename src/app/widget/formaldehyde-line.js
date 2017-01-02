angular.module("VivoDash").controller('FormaldehydeLineCtrl', ['$scope', FormaldehydeLineCtrl]);

function FormaldehydeLineCtrl ($scope) {
  $scope.labels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  $scope.series = ['Formaldehyde'];
  $scope.data = [
    [30, 50, 50, 40, 60, 80, 70]
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
