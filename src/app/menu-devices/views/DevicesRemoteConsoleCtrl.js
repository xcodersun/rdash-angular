angular.module('VivoDash')
  .controller('DevicesRemoteConsoleCtrl', ['$uibModalInstance', 'did', DevicesRemoteConsoleCtrl]);

function DevicesRemoteConsoleCtrl($uibModalInstance, did) {
  var drcc = this;
  console.log(did);

  ws = new WebSocket('ws://localhost:8080/');

  drcc.close = function() {
    $uibModalInstance.close('');
  }
}
