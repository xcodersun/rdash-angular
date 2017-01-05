angular.module('VivoDash')
  .controller('LoginCtrl', ['$state', 'userService', 'authenticationService', LoginCtrl]);

function LoginCtrl($state, userService, authenticationService) {
  var lc = this;

  lc.login = function() {
    var response = authenticationService.login(lc.username, lc.password);
    if (response.success) {
      authenticationService.setCredentials(lc.username, lc.password);
      $state.go('sidebar.home', {title:'home'}); 
    } else {
      alert('username or password incorrect.')
    }
  };
}
