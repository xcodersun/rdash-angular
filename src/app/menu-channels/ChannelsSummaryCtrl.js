angular.module('VivoDash')
  .controller('ChannelsSummaryCtrl', ['config', '$uibModal', '$state', 'flashService', 'channelService', ChannelsSummaryCtrl]);

function ChannelsSummaryCtrl(config, $uibModal, $state, flashService, channelService) {
  var csc = this;
  csc.channels = {};
  csc.deleteChannel = deleteChannel;
  csc.quickView = quickView;

  channelService.getAllChannels()
  .then(function (response) {
    flashService.clear();
    csc.channels = response;
  }).catch(function (e) {
    console.log(e);
    flashService.error(e.data.error);
  });

  return;

  function quickView(id) {
      var modalInstance = $uibModal.open({
        animation: true,
        ariaLabelledBy: 'modal-title',
        ariaDescribedBy: 'modal-body',
        templateUrl: 'templates/menu-channels/views/channel_quick_view.html',
        controller: 'ChannelQuickViewCtrl',
        controllerAs: 'cqvc',
        size: 'lg',
        resolve: {
          id: function() {
            return id;
          }
        }
      });
  }

  function deleteChannel(channel) {
    var modalInstance = $uibModal.open({
      animation: true,
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',
      templateUrl: 'templates/menu-channels/views/delete_channel.html',
      controller: 'DeleteChannelCtrl',
      controllerAs: 'dcc',
      backdrop: 'static',
      size: 'md',
      resolve: {
        channel: function() {
          return channel;
        }
      }
    });
    modalInstance.result.then(function() {
      $state.reload();
    });
  }
}
