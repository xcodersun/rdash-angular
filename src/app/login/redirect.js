angular.module('VivoDash')
	.run(['$rootScope', '$state', redirect]);

function redirect($rootScope, $state) {

	$rootScope.$on('$stateChangeStart', function (evt, toState, toParams, fromState, fromParams) {
		var loggedIn = $rootScope.globals;
		console.log(toState.name);
		if (toState.name != "login") {
			evt.preventDefault();
			$state.go('login'); 
		}
	});
	$rootScope.$on('$stateChangeSuccess', stateChangeSuccess);
	$rootScope.$on('$stateChangeError', stateChangeError);
}

function stateChangeSuccess(evt, toState, toParams, fromState, fromParams) {
	//console.log("stateChangeSuccess:" + fromState.name + JSON.stringify(fromParams) + 
	//	"->" + toState.name + JSON.stringify(toParams));
}

function stateChangeError(evt, toState, toParams, fromState, fromParams) {
	//console.log("stateChangeError" + fromState.name + JSON.stringify(fromParams) + 
	//	"->" + toState.name + JSON.stringify(toParams));
}