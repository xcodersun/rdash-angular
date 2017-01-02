angular.module("VivoDash").controller('HumidityDoughnutCtrl', ['$scope', HumidityDoughnutCtrl]);

function HumidityDoughnutCtrl ($scope) {
  $scope.labels = ["Humidity 0-29%", "Humidity 30-69%", "Humidity 70-99%"];
  $scope.data = [300, 500, 100];
}
