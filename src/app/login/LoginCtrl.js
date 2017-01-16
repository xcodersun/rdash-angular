angular.module('VivoDash')
  .controller('LoginCtrl', ['$state', 'authenticationService', 'flashService', LoginCtrl]);

function LoginCtrl($state, authenticationService, flashService) {
  var lc = this;
  lc.username = 'root';
  lc.password = 'waterISwide';

  lc.login = function() {
    authenticationService.login(lc.username, lc.password)
    .then(success).catch(fail);

    function success(response) {
      token = response.data.auth_token;
      tokenExpired = response.data.expires_at;

      authenticationService.setCredentials(token, tokenExpired);
      $state.go('sidebar.home', {title:'home'}); 
    };

    function fail(e) {
      flashService.error('username or password incorrect.', e.status);
    }
  };
}
