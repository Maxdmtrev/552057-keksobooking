'use strict';

(function () {
// Удаляем карточку квартиры по клику на крестик

  var popupClose = document.querySelectorAll('.popup__close'); // крестик на карточке
  var popup = document.querySelectorAll('.popup');

  popupClose.forEach(function (t) {
    t.addEventListener('click', function () {
      popup.forEach(function (elem) {
        elem.remove();
      });
      mapPin.forEach(function (elem) {
        elem.classList.remove('map__pin--active');
      });
      document.removeEventListener('keydown', popupCloseCrossHandler);
    });
  });

  // Удаляем карточку квартиры по нажатию ESCAPE

  function popupCloseCrossHandler(esc) {
    if (esc.keyCode === ESC_BUTTON) {
      popup.forEach(function (elem) {
        elem.remove();
      });
      document.removeEventListener('keydown', popupCloseCrossHandler);
    }
  }
  document.addEventListener('keydown', popupCloseCrossHandler);

  var ESC_BUTTON = 27;
  var ENTER_BUTTON = 13;

  // Элементы разметки

  var form = document.querySelector('.ad-form'); // форма
  var mapPinMain = document.querySelector('.map__pin--main'); // главная метка
  var map = document.querySelector('.map'); // карта
  var fieldset = document.querySelectorAll('fieldset'); // поля
  var address = form.querySelector('#address'); // адрес
  // Скрываем метки после загрузки страницы

  var mapPin = document.querySelectorAll('.map__pin');
  mapPin.forEach(function (hide) {
    hide.style.display = 'none';
    hide.classList.remove('map__pin--active');
  });

  // Главная метка видна после загрузки страницы

  mapPinMain.style.display = 'block';

  // Скрываем карточки с инфоормацией

  var houseCard = document.querySelectorAll('.popup');
  houseCard.forEach(function (hide) {
    hide.style.display = 'none';
  });

  // Делаем неактивными поля формы

  fieldset.forEach(function (elem) {
    elem.setAttribute('disabled', 'disabled');
  });

  // Функция показывающая координаты метки в строке адреса

  var PIN_SIZE = 65;

  function getCoordinatePin(center) {
    center = center === 'center' ? 2 : 1;
    var left = parseInt(mapPinMain.style.left, 10) + PIN_SIZE / 2;
    var top = parseInt(mapPinMain.style.top, 10) + PIN_SIZE / center;
    return left + ', ' + top;
  }

  address.value = getCoordinatePin('center');

  // Активируем карту

  mapPinMain.addEventListener('mouseup', function () {
    map.classList.remove('map--faded');
    form.classList.remove('ad-form--disabled');
    address.value = getCoordinatePin();

    // Отображаем метки и карточки квартир на экране

    mapPin.forEach(function (element) {
      element.style.display = 'block';
      element.addEventListener('click', function (view) {
        var index = view.target.getAttribute('rel');
        if (index) {
          window.renderCardHouse(window.data.flats[index]);
        }
      });
    });
    fieldset.forEach(function (elem) {
      elem.removeAttribute('disabled');
    });
  });

  // Добавляем класс метке по клику

  mapPin.forEach(function (pin) {
    pin.addEventListener('click', function (ad) {
      mapPin.forEach(function () {
        mapPinMain.classList.remove('map__pin--active');
        pin.className = pin.className.replace('map__pin--active', '');
        ad.currentTarget.classList.add('map__pin--active');
      });
    });
  });

  // Добавляем активный класс метке по нажатию ENTER

  mapPin.forEach(function (elem) {
    elem.addEventListener('keydown', function (ent) {
      mapPin.forEach(function (p) {
        if (ent.keyCode === ENTER_BUTTON) {
          p.className = p.className.replace('map__pin--active', '');
          ent.currentTarget.classList.add('map__pin--active');
        }
      });
    });
  });

})();
