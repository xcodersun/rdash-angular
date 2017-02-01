angular.module('VivoDash')
    .controller('DevicesSummaryCtrl', ['$http', '$cookies', 'config', '$uibModal', '$state', 'flashService', DevicesSummaryCtrl]);

function DevicesSummaryCtrl($http, $cookies, config, $uibModal, $state, flashService) {
	var dsc = this;
	//dsc.quickView = quickView;

	console.log("This is DevicesSummaryCtrl");

	/*var authToken = $cookies.getObject('authToken');

	$http({
		url: config.apiAdminChannels,
		method: 'GET',
		headers: {
			'Authentication': authToken.token
		},
	}).then(function (response) {
		flashService.clear();
		csc.channels = response.data;
	}).catch(function (e) {
		console.log(e);
		flashService.error(e.data["error"], e.status);
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
	}*/
}
