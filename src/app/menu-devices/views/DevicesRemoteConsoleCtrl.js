angular.module('VivoDash')
  .controller('DevicesRemoteConsoleCtrl', ['$scope', '$uibModalInstance', 'deviceService', 'cname', 'cid', 'did', DevicesRemoteConsoleCtrl]);

function DevicesRemoteConsoleCtrl($scope, $uibModalInstance, deviceService, cname, cid, did) {
  var drcc = this;
  drcc.cname = cname;
  drcc.table = [];
  greeting = false;

  ws = new WebSocket(deviceService.getDeviceAttachUrl(cid, did));

  ws.onopen = function(event) {
  }

  ws.onmessage = function(event) {
    if (!greeting) {
      greeting = true;
      return
    }
    var row = {};
    row.action = event.data.substring(0, 12).trim();
    row.time = event.data.substring(12, 38).trim();
    row.log = event.data.substring(38).trim();
    if (row.action == "INDEX") {
      row.log = angular.fromJson(row.log);
    }
    drcc.table.unshift(row);
    $scope.$apply();
  }

  drcc.close = function() {
    ws.close();
    $uibModalInstance.close('');
  }
}
