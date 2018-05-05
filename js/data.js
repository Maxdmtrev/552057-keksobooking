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
    var randomLengthFeatures = window.getRandomNumber(1, array.length);
    var result = [];
    for (var i = 0; i < randomLengthFeatures; i++) {
      result.push(window.getRandomItem(array));
    }
    return getUniqueFeatures(result);
  }

  // Вставляем сгенерированные квартиры сюда

  var flats = [];

  // Генерируем различные варианты квартир

  function getVariantsFlats() {
    for (var i = 1; i < 8; i++) {
      var adressX = window.getRandomNumber(300, 900);
      var adressY = window.getRandomNumber(150, 500);

      flats.push({
        author: {
          avatar: 'img/avatars/user' + '0' + i + '.png'
        },
        offer: {
          title: window.getRandomItem(HOUSE_TITLE),
          address: adressX + ', ' + adressY,
          price: window.getRandomNumber(1000, 1000000),
          type: window.getRandomItem(HOUSE_TYPE),
          rooms: window.getRandomNumber(1, 5),
          guests: window.getRandomNumber(1, 10),
          checkin: window.getRandomItem(HOUSE_CHECKIN_CHECKOUT),
          checkout: window.getRandomItem(HOUSE_CHECKIN_CHECKOUT),
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

  return {
    flats: flats
  };

})();
