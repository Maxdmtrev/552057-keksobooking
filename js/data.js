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

  var errorHandler = function (message) {
    var elem = document.createElement('DIV');
    elem.style = 'z.index: 100; margin: 0 auto; text-align: center; background-color: red; color: white; font-size: 20px; ' +
    'position: fixed; left: 0; top: 0; width: 100%; padding: 10px;';
    elem.textContent = 'Ошибка отправки формы: ' + message;
    document.body.innerAdjacentHTML('afterbegin', elem);
  };

  var getOffersFromServer = function (callback) {
    window.backend.load(function (data) {
      window.data.flats = data;
      window.data.photos = data;
      if (callback !== 'undefined') {
        callback();
      }
    }, function (message) {
      errorHandler(message);
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
