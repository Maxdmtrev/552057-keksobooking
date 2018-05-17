'use strict';

(function () {

  var mapInited = false;
  function init() {
    if (!mapInited) {
      window.pin.map.classList.remove('map--faded');
      window.form.disable(false);
      window.data.getOffersFromServer(function () {
        window.pin.renderMapPins(window.data.flats);
      });
      mapInited = true;
    }
  }

  window.map = {
    init: init
  };

})();
