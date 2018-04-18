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
  var object = {};
  var resultFeatures = [];
  for (var i = 0; i < array.length; i++) {
    var item = array[i];
    if (object[item] !== 1) {
      object[item] = 1;
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
  var arrayCopy = array.slice();
  var result = [];
  for (var i = 0; i < arrayCopy.length; i++) {
    var randArrayInd = Math.floor(Math.random * arrayCopy.length);
    result.push(arrayCopy[randArrayInd]);
    arrayCopy.splice(randArrayInd, 1); // Здесь возможно придется дописать код
  }
  return result;
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
        checkin: getRandomNumber(HOUSE_CHECKIN_CHECKOUT),
        checkout: getRandomNumber(HOUSE_CHECKIN_CHECKOUT),
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
  var newMapPin = templateMapPins.cloneNode(true);
  newMapPin.querySelector('img').src = pin.author.avatar;
  newMapPin.querySelector('img').setAttribute('rel', index);
  newMapPin.style.left = (pin.location.x) + 'px';
  newMapPin.style.top = (pin.location.y) + 'px';
  newMapPin.setAttribute('rel', index);
  return newMapPin;
}

var fragmentPins = document.createDocumentFragment(flats);

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

  cardHouse.querySelector('.popup__title').textContent = flat.offer.title;
  cardHouse.querySelector('.popup__text--address').textContent = flat.offer.adress;
  cardHouse.querySelector('.popup__text--price').textContent = flat.offer.price + '₽/ночь';
  flatType.textContent = flat.offer.type;
  flatType.textContent = TYPE[flat.offer.type];
  cardHouse.querySelector('.popup__text--capacity').textContent = flat.offer.rooms + ' комнаты для ' + flat.offer.guests + ' гостей';
  cardHouse.querySelector('.popup__text--time').textContent = 'Заезд после ' + flat.offer.checkin + ', выезд до ' + flat.offer.checkout;
  cardHouse.querySelector('.popup__description').textContent = flat.offer.description;
  features.textContent = '';
  /* photo.textContent = ''; */
  cardHouse.querySelector('.popup__avatar').textContent = flat.author.avatar;

  // Вставляем features

  flat.offer.features.forEach(function (li) {
    li = document.createElement('li');
    li.className = 'feature feature--';
    featuresFragment.appendChild(li);
  });
  features.appendChild(featuresFragment);
  features.textContent = flat.offer.description;
  document.querySelector('.map').appendChild(cardHouse);
  cardHouse.setAttribute('rel', index);

  // Вставляем photos

  /* var photoInsert = function () {
    flat.offer.photos.forEach(function (li) {
      li = document.createElement('li');
      var img = document.createElement('img');
      img.weight = 70;
      img.height = 70;
      li.appendChild(img);
      img.src = flat.offer.photos[li];
      photoFragment.appendChild(li);
    });
    photo.appendChild(photoFragment);
  };
  photoInsert();*/

  // Удаляет карточку квартиры при нажатии крестика

  var popup = document.querySelectorAll('.popup');
  var popupClose = document.querySelectorAll('.popup__close');
  popupClose.forEach(function (ext) {
    ext.addEventListener('click', function (element) {
      element.remove();
    });
    document.removeEventListener('keydown', popupCloseCrossHandler);
    popup.forEach(function (element) {
      element.classList.remove('.map__pin--active');
    });
  });


  // Функция удаления карточки при нажатии на кнопку ESC

  function popupCloseCrossHandler(esc) {
    if (esc.keyCode === ESC_BUTTON) {
      map.parentNode.removeChild(cardHouse);
      document.removeEventListener('keydown', popupCloseCrossHandler);
    }
    document.addEventListener('keydown', popupCloseCrossHandler);
  }
}
var ESC_BUTTON = 27;
var ENTER_BUTTON = 13;

// Выбираем элементы разметки

var form = document.querySelector('.ad-form');
var map = document.querySelector('.map');
var mapPin = document.querySelectorAll('.map__pin');
var mapPinMain = document.querySelector('.map__pin--main');

// Скрываем метки после загрузки

mapPin.forEach(function (hide) {
  hide.style.display = 'none';
  hide.classList.remove('.map__pin--active');
});

// Главная метка видна

mapPinMain.style.display = 'block';

// Скрываем карточки с информацией

var houseCard = document.querySelectorAll('.popup');
houseCard.forEach(function (hide) {
  hide.style.display = 'none';
});

// Активируем карточку

mapPinMain.addEventListener('mouseup', function () {
  map.classList.remove('map--faded');
  form.classList.remove('ad-form--disabled');

  // Отображаем метки карточки квартир

  mapPin.forEach(function (element) {
    element.style.display = 'block';
    element.addEventListener('click', function (e) {
      var index = e.target.getAttribute('rel');
      if (index) {
        renderCardHouse(flats[index]);
      }
    });
  });
});

// Присваиваем класс метке при клике

mapPin.forEach(function (clas) {
  clas.addEventListener('click', function (clic) {
    mapPin.forEach(function () {
      mapPinMain.classList.remove('.map__pin--active');
      clas.className = clas.className.replace('.map__pin--active');
      clic.currentTarget.classList.add('.map__pin--active');
    });
  });
});

// Добавляет класс активации метки при нажатии ENTER_BUTTON

mapPin.forEach(function (element) {
  element.addEventListener('keydown', function (key) {
    mapPin.forEach(function (add) {
      if (key.keyCode === ENTER_BUTTON) {
        add.className = add.className.replace('.map__pin--active');
        key.currentTarget.classList.add('.map__pin--active');
      }
    });
  });
});
