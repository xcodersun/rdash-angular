angular.module("VivoDash").controller('FormaldehydeBarCtrl', ['$scope', FormaldehydeBarCtrl]);

function FormaldehydeBarCtrl ($scope) {
	$scope.labels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
	$scope.series = ['Formaldehyde'];
	$scope.data = [
	    [30, 50, 50, 40, 60, 80, 70]
	];
}