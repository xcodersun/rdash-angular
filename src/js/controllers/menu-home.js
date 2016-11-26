angular.module('VivoDash')
    .controller('MenuHome', ['$scope', MenuHome]);

function MenuHome($scope) {
  $scope.myInterval = 3000;
  $scope.noWrapSlides = false;
  $scope.active = 0;
  var slides = $scope.slides = [];
  var currIndex = 0;

  $scope.addSlide = function() {
    slides.push({
      image: '/img/slide_' + currIndex + '.png',
      id: currIndex++
    });
  };

  for (var i = 0; i < 2; i++) {
    $scope.addSlide();
  }
}
