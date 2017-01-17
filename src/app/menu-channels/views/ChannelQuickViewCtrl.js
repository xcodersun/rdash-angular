angular.module('VivoDash')
    .controller('ChannelQuickViewCtrl', ['channel', ChannelQuickViewCtrl]);

function ChannelQuickViewCtrl(channel) {
  var cqvc = this;
  cqvc.channel = channel;
}
