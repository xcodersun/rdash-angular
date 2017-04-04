angular.module('VivoDash')
    .controller('MenuHomeCtrl', ['statsService', MenuHomeCtrl]);

function MenuHomeCtrl(statsService) {
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

    statsService.getSummary()
    .then(function (summary) {
      mhc.channels = summary.channels;
      mhc.dashboards = summary.dashboards;
      mhc.devices = summary.devices;
    }).catch(function (e) {
      mhc.channels = 0;
      mhc.dashboards = 0;
      mhc.devices = 0;      
    })
  }

  function addSlide(currIndex) {
    mhc.slides.push({
      image: '/img/slide_' + currIndex + '.png',
      id: currIndex++
    });
  }
}
