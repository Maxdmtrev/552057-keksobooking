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

  var MAIN_PIN_TOP_OFFSET = 48;

  var mapPinMain = document.querySelector('.map__pin--main'); // главная метка
  var map = document.querySelector('.map'); // карта

  function mapPinMainHandle(evt) {
    evt.preventDefault();
    // Начальные координаты курсора
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var shift = {};
    var markerCoords = {};
    // Функция перемещения метки
    function onMouseMove(move) {
      move.preventDefault();

      shift = {
        x: startCoords.x - move.clientX,
        y: startCoords.y - move.clientY
      };

      var dragPinLimits = {
        minX: 50,
        maxX: map.clientWidth - 100,
        minY: COORDS_LIMIT.top - MAP_PIN_SIZE.height / 2,
        maxY: COORDS_LIMIT.bottom - MAP_PIN_SIZE.height / 2
      };

      // Координаты остановки метки
      startCoords = {
        x: move.clientX,
        y: move.clientY
      };

      markerCoords = {
        x: mapPinMain.offsetLeft - shift.x,
        y: mapPinMain.offsetTop - shift.y
      };

      // Перемещение метки
      markerCoords.x = (markerCoords.x < dragPinLimits.minX) ? dragPinLimits.minX : markerCoords.x;
      markerCoords.x = (markerCoords.x > dragPinLimits.maxX) ? dragPinLimits.maxX : markerCoords.x;
      markerCoords.y = (markerCoords.y < dragPinLimits.minY - MAIN_PIN_TOP_OFFSET) ? dragPinLimits.minY - MAIN_PIN_TOP_OFFSET : markerCoords.y;
      markerCoords.y = (markerCoords.y > dragPinLimits.maxY - MAIN_PIN_TOP_OFFSET) ? dragPinLimits.maxY - MAIN_PIN_TOP_OFFSET : markerCoords.y;
      mapPinMain.style.left = markerCoords.x + 'px';
      mapPinMain.style.top = markerCoords.y + 'px';
    }

    function onMouseUp(upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      var address = document.querySelector('#address');
      address.value = 'x: ' + parseInt(markerCoords.x, 10) + ', ' + 'y: ' + (parseInt(markerCoords.y, 10) + MAP_PIN_SIZE.height / 2);
    }

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  }
  mapPinMain.addEventListener('mousedown', mapPinMainHandle);
})();
