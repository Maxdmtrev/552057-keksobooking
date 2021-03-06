'use strict';

(function () {

  // Инициализация открытия карты
  var mapInited = false;

  var init = function () {
    if (!mapInited) {
      var map = document.querySelector('.map');
      map.classList.remove('map--faded');
      window.form.disable(false);
      window.data.getOffersFromServer(function () {
        window.pin.renderMapPins(window.data.flats);
      });
      mapInited = true;
    }
  };

  window.map = {
    init: init
  };

})();
