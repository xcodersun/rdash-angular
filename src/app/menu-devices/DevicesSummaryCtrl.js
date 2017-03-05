angular.module('VivoDash')
  .controller('DevicesSummaryCtrl', ['$uibModal', 'flashService', 'channelService', DevicesSummaryCtrl]);

function DevicesSummaryCtrl($uibModal, flashService, channelService) {
  var dsc = this;
  dsc.devices = [];
  dsc.quickView = quickView;

  channelService.getAllChannels()
  .then(function (channels) {
    flashService.clear();
    dsc.channels = channels;

    for (var i in dsc.channels) {
      channelService.getChannelConnections(dsc.channels[i].id)
      .then(function (connections) {
        var connections = connections;
        for (var j = 0; j < connections.length; j++) {
          var device = {};
          device.cid = dsc.channels[i].id;
          device.status = connections[j].status;
          device.id = connections[j].device_id;
          device.ip = connections[j].ip;
          device.channel_name = connections[j].channel_name;
          device.connection_type = connections[j].connection_type;
          device.connected_at = connections[j].connected_at;
          dsc.devices.push(device);
        }
      }).catch(function(e) {
        // apiAdminScanConnections
        console.log(e);
        flashService.error(e.data.error);
      });
    } // channel scan ends
  }).catch(function (e) {
    // apiAdminChannels
    console.log(e);
    flashService.error(e.data.error);
  });

  return;

  function quickView(device) {
    var modalInstance = $uibModal.open({
      animation: true,
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',
      templateUrl: 'templates/menu-devices/views/devices_quick_view.html',
      controller: 'DeviceQuickViewCtrl',
      controllerAs: 'dqvc',
      size: 'lg',
      resolve: {
        device: function() {
          return device;
        }
      }
    });
  }
}
