angular.module('VivoDash')
  .controller('DevicesRemoteConsoleCtrl', ['$uibModalInstance', 'deviceService', 'cname', 'cid', 'did', DevicesRemoteConsoleCtrl]);

function DevicesRemoteConsoleCtrl($uibModalInstance, deviceService, cname, cid, did) {
  var drcc = this;
  drcc.cname = cname;

  ws = new WebSocket(deviceService.getDeviceAttachUrl(cid, did));

  ws.onopen = function(event) {
  }

  ws.onmessage = function(event) {
    console.log(event.data);
  }

  drcc.close = function() {
    ws.close();
    $uibModalInstance.close('');
  }
}
