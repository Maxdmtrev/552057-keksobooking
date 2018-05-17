'use strict';

(function () {

  var ESC_BUTTON = 27;
  var ENTER_BUTTON = 13;

  var popupClose = document.querySelector('.popup__close'); // крестик на карточке
  var popup = document.querySelectorAll('.popup');
  var template = document.querySelector('template').content;

  // Скрываем карточки
  var removeCard = function () {
    for (var i = 0; i < popup.length; i++) {
      var pop = popup[i];
      popupClose.addEventListener('click', removeCard);
      popupClose.addEventListener('keydown', popupCloseEscape);
      pop.remove();
    }
    window.pin.makeActive(document.querySelectorAll('.map__pin.map__pin--active'), false);
    document.removeEventListener('keydown', popupCloseEscape);
  };
  // Удаляем карточку квартиры по нажатию ESCAPE
  var popupCloseEscape = function (esc) {
    if (esc.keyCode === ESC_BUTTON) {
      removeCard();
    }
  };

  // Удаляем карточку квартиры по нажатию ENTER
  var popupCloseEnter = function (ent) {
    if (document.activeElement === ent.target && ent.keyCode === ENTER_BUTTON) {
      removeCard();
    }
  };

  // Отображаем метки и карточки квартир на экране
  function showCard(offer) {
    var offerCard = template.querySelector('article.map__card').cloneNode(true);
    offerCard.innerHTML = window.card.renderCardHouse(offer, offerCard);
    offerCard.style.top = '80px';
    offerCard.style.width = '300px';
    window.pin.mapPinsCard.insertAdjacentHTML('afterend', offerCard.outerHTML);
    popupClose.addEventListener('click', removeCard);
    document.addEventListener('keydown', popupCloseEscape);
    popupClose.addEventListener('keydown', popupCloseEnter);
  }

  window.showCard = {
    showCard: showCard,
    removeCard: removeCard
  };
})();
