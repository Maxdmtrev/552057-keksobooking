'use strict';

(function () {

  // Вставляем полученные данные сюда
  var flats = [];
  var photos = [];

  var showMessageError = function (message) {
    var elem = document.createElement('DIV');
    elem.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red; color: white; font-size: 20px; position: fixed; left: 0; top: 0; width: 100%; padding: 10px;';
    elem.textContent = 'Ошибка отправки формы: ' + message;
    document.body.insertAdjacentHTML('afterbegin', elem);
  };

  // Получаем данные с сервера
  var getOffersFromServer = function (callback) {
    window.backend.load(function (data) {
      window.data.flats = data;
      window.data.photos = data;
      if (typeof (callback) === 'function') {
        callback();
      }
    }, function (message) {
      showMessageError(message);
    });
  };

  window.data = {
    getOffersFromServer: getOffersFromServer,
    flats: flats,
    photos: photos
  };

})();
