'use strict';

(function () {

  var ESC_BUTTON = 27;
  var ENTER_BUTTON = 13;

  var template = document.querySelector('template').content;

  // Скрываем карточки
  var pinPopupClickHandler = function () {
    var popups = document.querySelectorAll('.map__card.popup');
    var popupClose = document.querySelector('.popup__close');

    for (var i = 0; i < popups.length; i++) {
      var popup = popups[i];
      popupClose.addEventListener('click', pinPopupClickHandler);
      popupClose.addEventListener('keydown', popupCloseEnter);
      popup.remove();
    }
    window.pin.makeActive(document.querySelectorAll('.map__pin.map__pin--active'), false);
    document.removeEventListener('keydown', popupCloseEscape);
  };

  // Удаляем карточку квартиры по нажатию ESCAPE
  var popupCloseEscape = function (esc) {
    if (esc.keyCode === ESC_BUTTON) {
      pinPopupClickHandler();
    }
  };

  // Удаляем карточку квартиры по нажатию ENTER
  var popupCloseEnter = function (ent) {
    if (document.activeElement === ent.target && ent.keyCode === ENTER_BUTTON) {
      pinPopupClickHandler();
    }
  };

  // Отображаем метки и карточки квартир на экране
  var showCard = function (offer) {
    var offerCard = template.querySelector('article.map__card').cloneNode(true);
    offerCard.innerHTML = window.card.renderCardHouse(offer, offerCard);
    offerCard.innerHTML = window.card.insertPhotosElement(offer, offerCard);
    offerCard.style.top = '80px';
    offerCard.style.width = '300px';

    // Добавить в DOM элемент карточки с данными
    var mapPins = document.querySelector('.map__pins');
    mapPins.insertAdjacentHTML('afterend', offerCard.outerHTML);

    var popupClose = document.querySelector('.popup__close');

    // Повесить бинды
    popupClose.addEventListener('click', pinPopupClickHandler);
    document.addEventListener('keydown', popupCloseEscape);
    popupClose.addEventListener('keydown', popupCloseEnter);
  };

  window.showCard = {
    showCard: showCard,
    pinPopupClickHandler: pinPopupClickHandler
  };

})();
