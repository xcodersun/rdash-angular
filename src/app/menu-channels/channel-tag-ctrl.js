angular.module('VivoDash')
    .controller('ChannelTagCtrl', ['$scope', ChannelTagCtrl]);

function ChannelTagCtrl($scope) {
  $scope.tags = ['bedroom1', 'guest room'];
  $scope.fields = ['temperature', 'humidity'];
  $scope.tag = '';

  $scope.removeTag = function(index) {
    $scope.tags.splice(index,1);
  };

  $scope.addTag = function() {
    if ($scope.tags.indexOf($scope.tag) === -1) {
      $scope.tags.push($scope.tag);
    } else {
      console.log('tag already exists');
    }
    $scope.tag = '';
  };

  $scope.removeField = function(index) {
    $scope.fields.splice(index,1);
  };

  $scope.addField = function() {
    if ($scope.fields.indexOf($scope.field) === -1) {
      $scope.fields.push($scope.field);
    } else {
      console.log('field already exists');
    }
    $scope.field = '';
  };
}
