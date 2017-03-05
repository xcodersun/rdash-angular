angular.module('VivoDash')
  .run(['$rootScope', '$state', '$cookies', 'flashService', redirect]);

function redirect($rootScope, $state, $cookies, flashService) {
  $rootScope.$on('$stateChangeStart', function (evt, toState, toParams, fromState, fromParams) {
    flashService.clear();
    var currentToken = $cookies.getObject('authToken') || undefined;

    if (toState.name != "login" && angular.isUndefined(currentToken)) {
      // prevent initial state change
      evt.preventDefault();
      $state.go('login'); 
    }
  });
  //$rootScope.$on('$stateChangeSuccess', stateChangeSuccess);
  //$rootScope.$on('$stateChangeError', stateChangeError);
}

function stateChangeSuccess(evt, toState, toParams, fromState, fromParams) {
  //console.log("stateChangeSuccess:" + fromState.name + JSON.stringify(fromParams) + 
  //  "->" + toState.name + JSON.stringify(toParams));
}

function stateChangeError(evt, toState, toParams, fromState, fromParams) {
  //console.log("stateChangeError" + fromState.name + JSON.stringify(fromParams) + 
  //  "->" + toState.name + JSON.stringify(toParams));
}
