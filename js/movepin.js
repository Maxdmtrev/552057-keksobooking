'use strict';

window.map = (function () {
  var MAP_PIN_SIZE = {
    width: 65,
    height: 95
  };

  var COORDS_LIMIT = {
    top: 200,
    bottom: 700
  };

  var mapPinMain = document.querySelector('.map__pin--main'); // главная метка
  var map = document.querySelector('.map'); // карта

  function mapPinMainHandle(evt) {
    evt.preventDefault();
    // Координаты курсора
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };
    // Функция перемещения метки
    function onMouseMove(move) {
      move.preventDefault();

      var dragPinLimits = {
        minX: 0,
        minY: COORDS_LIMIT.top - MAP_PIN_SIZE.height / 2,
        maxX: map.clientWidth,
        maxY: COORDS_LIMIT.bottom - MAP_PIN_SIZE.height / 2
      };

      // Координаты остановки метки
      startCoords = {
        x: move.clientX,
        y: move.clientY
      };

      // Перемещение метки
      if ((startCoords.x >= dragPinLimits.minX && startCoords.x <= dragPinLimits.maxX) && (startCoords.y >= dragPinLimits.minY && startCoords.y <= dragPinLimits.maxY)) {
        mapPinMain.style.left = startCoords.x + 'px';
        mapPinMain.style.top = startCoords.y + 'px';

        var address = document.querySelector('#address');
        address.value = 'x: ' + startCoords.x + ', ' + 'y: ' + (startCoords.y + MAP_PIN_SIZE.height / 2);
      }
    }

    function onMouseUp(upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    }

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  }
  mapPinMain.addEventListener('mousedown', mapPinMainHandle);
})();
