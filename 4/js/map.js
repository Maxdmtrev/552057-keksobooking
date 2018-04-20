'use strict';

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

var HOUSE_PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];

// Функция генерирующая случайное число

var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Получение случайного элемента массива

var getRandomItem = function (array) {
  var randomItem = Math.floor(Math.random() * array.length);
  return array[randomItem];
};

// Функция генерирующая уникальные фичи

var getUniqueFeatures = function (array) {
  var uniqueFeatures = {};
  var resultUniqueFeatures = [];
  for (var i = 0; i < array.length; i++) {
    var item = array[i];
    if (uniqueFeatures[item] !== 1) {
      uniqueFeatures[item] = 1;
      resultUniqueFeatures.push(item);
    }
  }
  return resultUniqueFeatures;
};

// Функция генерирующая случайные фичи из массива resultUniqueFeatures

var getRandomFeatures = function (array) {
  var randomLengthFeatures = getRandomNumber(1, array.length);
  var result = [];
  for (var i = 0; i < randomLengthFeatures; i++) {
    result.push(getRandomItem(array));
  }
  return getUniqueFeatures(result);
};

// Функция для сортировки фото в случайном порядке

var randomArray = function (array) {
  for (var i = array.lenght - 1; i >= 0; i--) {
    var randArrayInd = Math.floor(Math.random * (i + 1));
    var itemArrayInd = array[randArrayInd];
    array[randArrayInd] = array[i];
    array[i] = itemArrayInd;
  }
  return array;
};

// Вставляем сгенерированные квартиры сюда

var flats = [];

// Генерируем различные варианты квартир

var getVariantsFlats = function () {
  for (var i = 1; i < 8; i++) {
    var adressX = getRandomNumber(300, 900);
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
        photos: randomArray(HOUSE_PHOTOS)
      },

      location: {
        x: getRandomNumber(300, 900),
        y: getRandomNumber(150, 500)
      }

    });
  }
  return flats;
};

getVariantsFlats();

// ================================================================================

// Переключаем карту в активное состояние

var map = document.querySelector('.map');
map.classList.remove('map--faded');

// Создаем шаблон меток

var templateMapPins = document.querySelector('template').content.querySelector('.map__pin');

// Сгенерированные элементы будут отображаться здесь

var mapPins = document.querySelector('.map__pins');

// Функция создающая метки

var renderMapPin = function (pin) {
  var newMapPin = templateMapPins.cloneNode(true);
  newMapPin.querySelector('img').src = pin.author.avatar;
  newMapPin.style.left = (pin.location.x) + 'px';
  newMapPin.style.top = (pin.location.y) + 'px';
  return newMapPin;
};

var fragmentPins = document.createDocumentFragment(flats);

for (var i = 0; i < flats.length; i++) {
  fragmentPins.appendChild(renderMapPin(flats[i]));
}
mapPins.appendChild(fragmentPins);

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

var renderCardHouse = function (flat) {
  var cardHouse = templateCardHouse.cloneNode(true);
  var features = cardHouse.querySelector('.popup__features');
  var flatType = cardHouse.querySelector('.popup__type');
  var photo = cardHouse.querySelector('.popup__photos');
  var photoFragment = document.createDocumentFragment();
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

  // Вставляем photos

  photo.innerHTML = '';
  var photoInsert = function () {
    for (var k = 0; k < flat.offer.photos.length; k++) {
      var li = document.createElement('li');
      var img = document.createElement('img');
      img.width = 70;
      img.height = 70;
      photo.appendChild(img);
      img.src = flat.offer.photos[k];
      photoFragment.appendChild(li);
    }
    photo.appendChild(photoFragment);
  };
  photoInsert()
};

renderCardHouse(flats[0]);
