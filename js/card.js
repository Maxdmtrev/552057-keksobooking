'use strict';

(function () {

  // Функция генерирующая новые карточки с информацией

  function renderCardHouse(flat, index) {
    var cardHouse = window.templateCardHouse.cloneNode(true);
    var features = cardHouse.querySelector('.popup__features');
    var flatType = cardHouse.querySelector('.popup__type');
    var featuresFragment = document.createDocumentFragment();

    cardHouse.querySelector('.popup__avatar').src = flat.author.avatar;
    cardHouse.querySelector('.popup__title').textContent = flat.offer.title;
    cardHouse.querySelector('.popup__text--address').textContent = flat.offer.address;
    cardHouse.querySelector('.popup__text--price').textContent = flat.offer.price + '₽/ночь';
    flatType.textContent = flat.offer.type;
    flatType.textContent = window.TYPE[flat.offer.type];
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
  }
  window.card = {
    renderCardHouse: renderCardHouse
  };

})();
