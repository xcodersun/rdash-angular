angular.module('VivoDash')
    .controller('DeviceQuickViewCtrl', ['$scope', 'device', 'config', '$cookies', '$http', DeviceQuickViewCtrl]);

function DeviceQuickViewCtrl($scope, device, config, $cookies, $http) {
  console.log(device);
}
