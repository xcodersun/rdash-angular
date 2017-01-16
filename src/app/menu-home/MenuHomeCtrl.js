angular.module('VivoDash')
    .controller('MenuHomeCtrl', ['$http', '$cookies', 'config', MenuHomeCtrl]);

function MenuHomeCtrl($http, $cookies, config) {
  var mhc = this;

  mhc.myInterval = 5000;
  mhc.noWrapSlides = false;
  mhc.noPause = true;
  mhc.active = 0;
  mhc.slides = [];

  initialization();
  return;

  function initialization() {
    for (var i = 0; i < 4; i++) {
      addSlide(i);
    }

    var authToken = $cookies.getObject('authToken')

    $http({
      url: config.apiAdminSummary,
      method: 'GET',
      headers: {
        'Authentication': authToken.token
      },
    }).then(success).catch(fail);

    function success(response) {
      mhc.channels = response.data.channels;
      mhc.dashboards = response.data.dashboards;
      mhc.devices = response.data.devices;
    }

    function fail(e) {
      mhc.channels = 0;
      mhc.dashboards = 0;
      mhc.devices = 0;
    }
  }

  function addSlide(currIndex) {
    mhc.slides.push({
      image: '/img/slide_' + currIndex + '.png',
      id: currIndex++
    });
  }
}
