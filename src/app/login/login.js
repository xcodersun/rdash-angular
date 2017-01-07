angular.module('VivoDash')
  .controller('LoginCtrl', ['$state', 'AuthenticationService', 'FlashService', LoginCtrl]);

function LoginCtrl($state, AuthenticationService, FlashService) {
  var lc = this;
  lc.username = 'root';
  lc.password = 'waterISwide';

  lc.login = function() {
    AuthenticationService.login(lc.username, lc.password)
    .then(success).catch(fail);

    function success(response) {
      token = response.data.auth_token;
      tokenExpired = response.data.expires_at;

      AuthenticationService.setCredentials(token, tokenExpired);
      $state.go('sidebar.home', {title:'home'}); 
    };

    function fail(e) {
      FlashService.error('username or password incorrect.');
    }
  };
}
