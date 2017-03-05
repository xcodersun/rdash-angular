angular.module('VivoDash')
  .factory('utilService', utilService);

utilService.$inject = ['config', 'basicHttpService'];

function utilService(config, basicHttpService) {
  var service = {};

  service.getDateFromNow = getDateFromNow;

  return service;

  function getDateFromNow(offset, type) {
    date = new Date();
    date.setDate(date.getDate() + offset);
    if (type == 'start') {
      date.setHours(0);
      date.setMinutes(0);
      date.setSeconds(0);
    } else if (type == 'end') {
      date.setHours(23);
      date.setMinutes(59);
      date.setSeconds(59);
    }
    return Math.floor(date.getTime());
  }
}