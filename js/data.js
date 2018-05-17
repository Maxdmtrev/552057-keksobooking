'use strict';

(function () {

  var TYPE = {
    'flat': 'Квартира',
    'bungalo': 'Бунгало',
    'house': 'Дом',
    'palace': 'Дворец'
  };

  var HOUSE_CHECKIN_CHECKOUT = [
    '12:00',
    '13:00',
    '14:00'
  ];

  // Вставляем сгенерированные квартиры сюда

  var flats = [];
  var photos = [];

  var getOffersFromServer = function (callback) {
    window.backend.load(function (data) {
      window.data.flats = data;
      window.data.photos = data;
      if (callback !== 'undefined') {
        callback();
      }
    }, function (message) {
      window.form.errorHandler(message);
    });
  };

  window.data = {
    getOffersFromServer: getOffersFromServer,
    flats: flats,
    TYPE: TYPE,
    HOUSE_CHECKIN_CHECKOUT: HOUSE_CHECKIN_CHECKOUT,
    photos: photos
  };

})();
