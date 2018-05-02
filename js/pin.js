'use strict';

(function () {
// Создаем шаблон меток

  var templateMapPins = document.querySelector('template').content.querySelector('.map__pin');

  // Сгенерированные элементы будут отображаться здесь

  var mapPins = document.querySelector('.map__pins');

  // Функция создающая метки

  window.renderMapPins = function (pin, index) {
    var newMapPins = templateMapPins.cloneNode(true);
    newMapPins.querySelector('img').src = pin.author.avatar;
    newMapPins.querySelector('img').setAttribute('rel', index);
    newMapPins.style.left = (pin.location.x) + 'px';
    newMapPins.style.top = (pin.location.y) + 'px';
    newMapPins.setAttribute('rel', index);
    return newMapPins;
  };

  var fragmentPins = document.createDocumentFragment();

  for (var i = 0; i < window.data.flats.length; i++) {
    fragmentPins.appendChild(window.renderMapPins(window.data.flats[i], i));
  }
  mapPins.appendChild(fragmentPins);

})();
