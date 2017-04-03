angular.module('VivoDash')
  .controller('DevicesRemoteConsoleCtrl', ['$scope', '$uibModalInstance', 'deviceService', 'cname', 'cid', 'did', DevicesRemoteConsoleCtrl]);

function DevicesRemoteConsoleCtrl($scope, $uibModalInstance, deviceService, cname, cid, did) {
  var drcc = this;
  drcc.cname = cname;
  drcc.table = [];
  greeting = false;
  ws = {};

  drcc.attach = function() {
    ws = new WebSocket(deviceService.getDeviceAttachUrl(cid, did));

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
  }

  drcc.detach = function() {
    if (ws.readyState != ws.CLOSED) {
      greeting = false;
      ws.close();
    }
  }

  drcc.close = function() {
    if (ws.readyState != ws.CLOSED) {
      ws.close();
    }
    $uibModalInstance.close('');
  }

  drcc.rowClass = function(row) {
    cssClass = "";
    switch (row.action) {
      case "UPLOAD":
        cssClass = "list-group-item-success";
        break;
      case "INDEX":
        cssClass = "list-group-item-info";
        break;
      case "DISCONNECT":
        cssClass = "list-group-item-warning";
        break;
      case "ERROR":
        cssClass = "list-group-item-danger";
        break;
    }
    return "list-group-item row no-margin-row " + cssClass;
  }
}
