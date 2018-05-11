'use strict';

(function () {
  /*
  var PIN_SIZE = 65;

  // Элементы разметки
  window.templateCardHouse = document.querySelector('template').content.querySelector('.map__card'); // создаем шаблон карточек квартиры
  var form = document.querySelector('.ad-form'); // форма
  var mapPinMain = document.querySelector('.map__pin--main'); // главная метка
  var map = document.querySelector('.map'); // карта
  var mapPin = document.querySelectorAll('.map__pin'); //
  window.address = form.querySelector('#address'); // адрес

  // Скрываем карточки с инфоормацией
  var houseCard = document.querySelectorAll('.popup');
  houseCard.forEach(function (hide) {
    hide.style.display = 'none';
  });

  // Функция показывающая координаты метки в строке адреса
  window.getCoordinatePin = function (center) {
    center = center === 'center' ? 2 : 1;
    var left = parseInt(mapPinMain.style.left, 10) + PIN_SIZE / 2;
    var top = parseInt(mapPinMain.style.top, 10) + PIN_SIZE / center;
    return left + ', ' + top;
  };

  window.address.value = window.getCoordinatePin('center');

  // Активируем карту
  mapPinMain.addEventListener('mouseup', function () {
    map.classList.remove('map--faded');
    form.classList.remove('ad-form--disabled');
    window.address.value = window.getCoordinatePin();

    // Отображаем метки и карточки квартир на экране
    mapPin.forEach(function (element) {
      element.style.display = 'block';
      element.addEventListener('click', function (view) {
        var index = view.target.getAttribute('rel');
        if (index) {
          window.card.renderCardHouse(window.data.flats[index]);
        }
      });
    });
    window.form.fieldset.forEach(function (elem) {
      elem.removeAttribute('disabled');
    });
  });
  */
  var mapInited = false;
  function init() {
    if (!mapInited) {
      window.pin.map.classList.remove('map--faded');
      window.form.disable(false);
      window.data.getOffersFromServer(function () {
        window.pin.renderMapPins(window.data.flats);
      });
      mapInited = true;
    }
  }

  window.map = {
    init: init
    /* mapPin: mapPin */
  };

})();
