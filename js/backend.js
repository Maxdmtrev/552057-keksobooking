'use strict';

(function () {
  var CODE_SUCCESS = 200;
  var TIME_OUT = 4000;

  function init(onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = TIME_OUT;

    xhr.addEventListener('load', function () {
      if (xhr.status === CODE_SUCCESS) {
        onSuccess(xhr.response);
      } else {
        onError('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });
    return xhr;
  }

  window.backend = {

    // Отправка данных на сервер
    upLoad: function (data, onLoad, onError) {
      var URL = 'https://js.dump.academy/keksobooking';
      var xhr = init(onLoad, onError);
      xhr.open('POST', URL);
      xhr.send(data);
    },

    // Получение данных с сервера
    load: function (onLoad, onError) {
      var URL = 'https://js.dump.academy/keksobooking/data';
      var xhr = init(onLoad, onError);
      xhr.open('GET', URL);
      xhr.send();
    }
  };

})();
