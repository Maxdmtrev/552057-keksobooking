'use strict';

(function () {

  var IMAGE_WIDTH = 70;
  var IMAGE_HEIGHT = 70;
  var HOUSE_TYPE = {
    'flat': 'Квартира',
    'bungalo': 'Бунгало',
    'house': 'Дом',
    'palace': 'Дворец'
  };

  // Функция генерирующая новые карточки с информацией
  var renderCardHouse = function (data, cardElement) {

    var cardTitle = cardElement.querySelector('.popup__title');
    var cardAddress = cardElement.querySelector('.popup__text--address');
    var cardPrice = cardElement.querySelector('.popup__text--price');
    var cardAvatar = cardElement.querySelector('.popup__avatar');
    var cardFeatures = cardElement.querySelector('.popup__features');
    var cardType = cardElement.querySelector('.popup__type');
    var cardCapacity = cardElement.querySelector('.popup__text--capacity');
    var cardTime = cardElement.querySelector('.popup__text--time');
    var cardDescription = cardElement.querySelector('.popup__description');
    var featuresFragment = document.createDocumentFragment();

    cardAvatar.src = data.author.avatar;
    cardTitle.textContent = data.offer.title;
    cardAddress.textContent = data.offer.address;
    cardPrice.textContent = data.offer.price + '₽/ночь';
    cardType.textContent = HOUSE_TYPE[data.offer.type];
    cardCapacity.textContent = data.offer.rooms + ' комнаты' + ' для ' + data.offer.guests + ' гостей';
    cardTime.textContent = 'Заезд после ' + data.offer.checkin + ', ' + 'выезд до ' + data.offer.checkout;

    // Вставляем features в карточку
    data.offer.features.forEach(function (elem) {
      var li = document.createElement('li');
      li.className = 'feature  feature--' + elem;
      featuresFragment.appendChild(li);
    });

    cardFeatures.innerHTML = '';
    cardFeatures.appendChild(featuresFragment);
    cardDescription.textContent = data.offer.description;
    return cardElement.innerHTML;
  };

  // Вставляем фотографии в карточку
  var insertPhotosElement = function (data, cardElement) {
    var cardPhoto = cardElement.querySelector('.popup__photos');
    var photosFragment = document.createDocumentFragment();

    data.offer.photos.forEach(function (elem) {
      var photoElem = document.createElement('li');
      var img = document.createElement('img');
      img.width = IMAGE_WIDTH;
      img.height = IMAGE_HEIGHT;
      photoElem.appendChild(img);
      img.src = elem;
      photoElem.src = data.offer.photos;
      photosFragment.appendChild(img);
    });

    cardPhoto.innerHTML = '';
    cardPhoto.appendChild(photosFragment);
    return cardElement.innerHTML;
  };

  window.card = {
    renderCardHouse: renderCardHouse,
    insertPhotosElement: insertPhotosElement
  };

})();
