'use strict';

(function () {

  // Функция генерирующая новые карточки с информацией

  function renderCardHouse(data, cardHouse) {
    /* var cardHouse = window.templateCardHouse.cloneNode(true); */
    var cardTitle = cardHouse.querySelector('.popup__title');
    var cardAddress = cardHouse.querySelector('.popup__text--address');
    var cardPrice = cardHouse.querySelector('.popup__text--price');
    var cardAvatar = cardHouse.querySelector('.popup__avatar');
    var cardFeatures = cardHouse.querySelector('.popup__features');
    var cardType = cardHouse.querySelector('.popup__type');
    var cardCapacity = cardHouse.querySelector('.popup__text--capacity');
    var cardTime = cardHouse.querySelector('.popup__text--time');
    var cardPhoto = cardHouse.querySelector('.popup__photos');
    var featuresFragment = document.createDocumentFragment();

    cardAvatar.src = data.author.avatar;
    cardTitle.textContent = data.offer.title;
    cardAddress.textContent = data.offer.address;
    cardPrice.textContent = data.offer.price + '₽/ночь';
    cardType.textContent = data.offer.type;
    cardType.textContent = window.data.TYPE[data.offer.type];
    cardCapacity.textContent = data.offer.rooms + ' комнаты' + ' для ' + data.offer.guests + ' гостей';
    cardTime.textContent = 'Заезд после ' + data.offer.checkin + ', ' + 'выезд до ' + data.offer.checkout;

    // Вставляем features

    for (var j = 0; j < data.offer.features.length; j++) {
      var li = document.createElement('li');
      li.className = 'feature  feature--' + data.offer.features[j];
      featuresFragment.appendChild(li);
    }

    var photosFragment = document.createDocumentFragment();
    for (var i = 0; i < data.offers.photos.length; i++) {
      var photoElem = document.createElement('li');
      var img = document.createElement('img');
      img.weidth = 70;
      img.height = 70;
      photoElem.appendChild(img);
      img.src = data.offer.photos;
      photoElem.src = data.offer.photos;
      photosFragment.appendChild(photoElem);
    }
    cardPhoto.innerHTML = '';
    cardPhoto.appendChild(photosFragment);

    cardFeatures.innerHTML = ' ';
    cardFeatures.appendChild(featuresFragment);
    cardFeatures.nextElementSibling.textContent = data.offer.description;
    cardAvatar.src = data.author.avatar;
    return cardHouse.innerHTML;
  }

  window.card = {
    renderCardHouse: renderCardHouse
  };

})();
