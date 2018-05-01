'use strict';

window.data = (function () {
  // Данные

  var HOUSE_TITLE = [
    'Большая уютная квартира',
    'Маленькая неуютная квартира',
    'Огромный прекрасный дворец',
    'Маленький ужасный дворец',
    'Красивый гостевой домик',
    'Некрасивый негостеприимный домик',
    'Уютное бунгало далеко от моря',
    'Неуютное бунгало по колено в воде'
  ];

  var HOUSE_TYPE = [
    'palace',
    'flat',
    'house',
    'bungalo'
  ];

  var HOUSE_CHECKIN_CHECKOUT = [
    '12:00',
    '13:00',
    '14:00'
  ];

  var HOUSE_FEATURES = [
    'wifi',
    'dishwasher',
    'parking',
    'washer',
    'elevator',
    'conditioner'
  ];

  // Функция генерирующая уникальные фичи

  function getUniqueFeatures(array) {
    var obj = {};
    var resultFeatures = [];
    for (var i = 0; i < array.length; i++) {
      var item = array[i];
      if (obj[item] !== 1) {
        obj[item] = 1;
        resultFeatures.push(item);
      }
    }
    return resultFeatures;
  }

  // Функция генерирующая случайные фичи из массива resultUniqueFeatures

  function getRandomFeatures(array) {
    var randomLengthFeatures = getRandomNumber(1, array.length);
    var result = [];
    for (var i = 0; i < randomLengthFeatures; i++) {
      result.push(getRandomItem(array));
    }
    return getUniqueFeatures(result);
  }

  // Вставляем сгенерированные квартиры сюда

  var flats = [];

  // Генерируем различные варианты квартир

  function getVariantsFlats() {
    for (var i = 1; i < 8; i++) {
      var adressX = window.getRandomNumber(300, 900);
      var adressY = getRandomNumber(150, 500);

      flats.push({
        author: {
          avatar: 'img/avatars/user' + '0' + i + '.png'
        },
        offer: {
          title: getRandomItem(HOUSE_TITLE),
          address: adressX + ', ' + adressY,
          price: getRandomNumber(1000, 1000000),
          type: getRandomItem(HOUSE_TYPE),
          rooms: getRandomNumber(1, 5),
          guests: getRandomNumber(1, 10),
          checkin: getRandomItem(HOUSE_CHECKIN_CHECKOUT),
          checkout: getRandomItem(HOUSE_CHECKIN_CHECKOUT),
          features: getRandomFeatures(HOUSE_FEATURES),
          description: '',
          photos: []
        },

        location: {
          x: adressX,
          y: adressY
        }
      });
    }
    return flats;
  }

  getVariantsFlats();

  // Создаем шаблон карточек квартиры

  var templateCardHouse = document.querySelector('template').content.querySelector('.map__card');

  // Объект с названием квартир

  var TYPE = {
    'flat': 'Квартира',
    'bungalo': 'Бунгало',
    'house': 'Дом',
    'palace': 'Дворец'
  };

  // Функция генерирующая новые карточки с информацией

  window.renderCardHouse = function (flat, index) {
    var cardHouse = templateCardHouse.cloneNode(true);
    var features = cardHouse.querySelector('.popup__features');
    var flatType = cardHouse.querySelector('.popup__type');
    var featuresFragment = document.createDocumentFragment();

    cardHouse.querySelector('.popup__avatar').src = flat.author.avatar;
    cardHouse.querySelector('.popup__title').textContent = flat.offer.title;
    cardHouse.querySelector('.popup__text--address').textContent = flat.offer.address;
    cardHouse.querySelector('.popup__text--price').textContent = flat.offer.price + '₽/ночь';
    flatType.textContent = flat.offer.type;
    flatType.textContent = TYPE[flat.offer.type];
    cardHouse.querySelector('.popup__description').textContent = flat.offer.description;
    cardHouse.querySelector('.popup__text--capacity').textContent = flat.offer.rooms + ' комнаты' + ' для ' + flat.offer.guests + ' гостей';
    cardHouse.querySelector('.popup__text--time').textContent = 'Заезд после ' + flat.offer.checkin + ', ' + 'выезд до ' + flat.offer.checkout;

    // Вставляем features

    features.innerHTML = '';
    for (var j = 0; j < flat.offer.features.length; j++) {
      var li = document.createElement('li');
      li.className = 'feature  feature--' + flat.offer.features[j];
      featuresFragment.appendChild(li);
    }
    features.appendChild(featuresFragment);
    features.nextElementSibling.textContent = flat.offer.description;
    document.querySelector('.map').appendChild(cardHouse);
    cardHouse.setAttribute('rel', index);

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
    var ESC_BUTTON = 27;
    function popupCloseCrossHandler(esc) {
      if (esc.keyCode === ESC_BUTTON) {
        popup.forEach(function (elem) {
          elem.remove();
        });
        document.removeEventListener('keydown', popupCloseCrossHandler);
      }
    }
    document.addEventListener('keydown', popupCloseCrossHandler);
  };

  return {
    flats: flats
  };

})();
