angular.module('VivoDash')
  .controller('LoginCtrl', ['$scope', '$state', 'userService', LoginCtrl]);

function LoginCtrl($scope, $state, userService) {
  $scope.login = function(cred) {
    var user = userService.login(cred);
    if (angular.isUndefined(user)) {
      alert('username or password incorrect.')
    } else {
      $state.go('sidebar.home', {title:'home'}); 
    }
  };
}