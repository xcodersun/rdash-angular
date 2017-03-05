angular.module('VivoDash')
  .controller('EditChannelWarningCtrl', ['$uibModalInstance', EditChannelWarningCtrl]);

function EditChannelWarningCtrl($uibModalInstance) {
  var ecwc = this;

  ecwc.close = function() {
    $uibModalInstance.close('');
  }
}