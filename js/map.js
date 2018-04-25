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


// Функция генерирующая случайное число

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Получение случайного элемента массива

function getRandomItem(array) {
  var randomItem = Math.floor(Math.random() * array.length);
  return array[randomItem];
}

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

// Функция для сортировки фото в случайном порядке

/* var randomArray = function (array) {
  for (var i = array.lenght - 1; i >= 0; i--) {
    var randArrayInd = Math.floor(Math.random() * (i + 1));
    var itemArrayInd = array[randArrayInd];
    array[randArrayInd] = array[i];
    array[i] = itemArrayInd;
  }
  return array;
}; */

// Вставляем сгенерированные квартиры сюда

var flats = [];

// Генерируем различные варианты квартир

function getVariantsFlats() {
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

// ================================================================================


// Создаем шаблон меток

var templateMapPins = document.querySelector('template').content.querySelector('.map__pin');

// Сгенерированные элементы будут отображаться здесь

var mapPins = document.querySelector('.map__pins');

// Функция создающая метки

function renderMapPins(pin, index) {
  var newMapPins = templateMapPins.cloneNode(true);
  newMapPins.querySelector('img').src = pin.author.avatar;
  newMapPins.querySelector('img').setAttribute('rel', index);
  newMapPins.style.left = (pin.location.x) + 'px';
  newMapPins.style.top = (pin.location.y) + 'px';
  newMapPins.setAttribute('rel', index);
  return newMapPins;
}

var fragmentPins = document.createDocumentFragment();

for (var i = 0; i < flats.length; i++) {
  fragmentPins.appendChild(renderMapPins(flats[i], i));
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

function renderCardHouse(flat, index) {
  var cardHouse = templateCardHouse.cloneNode(true);
  var features = cardHouse.querySelector('.popup__features');
  var flatType = cardHouse.querySelector('.popup__type');
  /* var photo = cardHouse.querySelector('.popup__photos');
  var photoFragment = document.createDocumentFragment(); */
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
  // Вставляем photos

  /* photo.innerHTML = '';
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
  photoInsert() */

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
}

var ESC_BUTTON = 27;
var ENTER_BUTTON = 13;

// Элементы разметки

var form = document.querySelector('.ad-form'); // форма
var mapPinMain = document.querySelector('.map__pin--main'); // главная метка
var map = document.querySelector('.map'); // карта
var fieldset = document.querySelectorAll('fieldset'); // поля
var filters = document.querySelectorAll('.map__filters-container') // Фильтры
var address = form.querySelector('#address')
// var avatar = document.querySelectorAll('#avatar');

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

function getCoordinatePin() {
  address.value = mapPinMain.style.left.slice(0, -2) + ', ' + mapPinMain.style.top.slice(0, -2);
};

// Активируем карту

mapPinMain.addEventListener('mouseup', function () {
  map.classList.remove('map--faded');
  form.classList.remove('ad-form--disabled');
  getCoordinatePin();
  // Отображаем метки и карточки квартир на экране

  mapPin.forEach(function (element) {
    element.style.display = 'block';
    element.addEventListener('click', function (view) {
      var index = view.target.getAttribute('rel');
      if (index) {
        renderCardHouse(flats[index]);
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
