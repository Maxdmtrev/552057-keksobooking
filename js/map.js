'use strict';

//Данные

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
]

//Функция генерирующая случайное число

var getRandomNumber = function (min, max){
  return Math.floor(Math.random() * (max - min + 1) ) + min;
};

//Получение случайного элемента массива

var getRandomItem = function (array){
  var randomItem = Math.floor(Math.random() * array.length);
  return array[randomItem]
};

// Функция генерирующая уникальные фичи

var getUniqueFeatures = function (array){
  var uniqueFeatures = {};
  var resultUniqueFeatures = [];
  for (var i = 0; i < array.length; i++){
    item = array[i];
    if (uniqueFeatures[item] !=== 1){
      uniqueFeatures[item] === 1;
      resultUniqueFeatures.push(item)
    }
  }
  return resultUniqueFeatures
};

//Функция генерирующая случайные фичи из массива resultUniqueFeatures

var getRandomFeatures = function(array){
  var randomLengthFeatures = getRandomNumber(1, array.length);
  result = [];
  for (var i = 0; i < randomLengthFeatures; i++){
    result.push(getRandomItem(array))
  }
  return getUniqueFeatures(result)
};

// Функция для сортировки фото в случайном порядке

var randomArray = function (array){
  var arrayCopy = array.slice();
  var result = [];
  for (var i = 0; i < arrayCopy.length; i++){
    var randArrayInd = Math.floor(Math.random * arrayCopy.length);
    result.push(arrayCopy[randArrayInd]);
    arrayCopy.splice(randArrayInd, 1) // Здесь возможно придется дописать код
  }
  return result
}

//Вставляем сгенерированные квартиры сюда

var flats = [];

// Генерируем различные варианты квартир

var getVariantsFlats = function (){
for (var i = 1; i < 8; i++){
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
      photos: randomArray(HOUSE_PHOTOS)
  },

  location: {
    x: getRandomNumber (300, 900),
    y: getRandomNumber (150, 500)
  }

  });
}
  return flats
};

  getVariantsFlats();

================================================================================

//Переключаем карту в активное состояние

var map = document.querySelector('.map').classList.remove('map--faded');

//Создаем шаблон меток

var templateMapPins = document.querySelector('template').content.querySelector('.map__pin');

//Сгенерированные элементы будут отображаться здесь

var mapPins = document.querySelector('.map__pins');

//Функция создающая метки

var renderMapPin = function (pin){
  var newMapPin = templateMapPins.cloneNode(true);
  newMapPin.querySelector('img').src = pin.author.avatar;
  newMapPin.style.left = (pin.location.x) + 'px';
  newMapPin.style.top = (pin.location.y) + 'px';
  return newMapPin
}

var createPins = document.createDocumentFragment();

for (var i = 0; i < flats.length; i++){
  fragmentPins.appendChild(renderMapPin(flats[i]));
}
mapPins.appendChild(fragmentPins);

//Создаем шаблон карточек квартиры

var templateCardHouse = document.querySelector('template').content.querySelector('.map__card');
