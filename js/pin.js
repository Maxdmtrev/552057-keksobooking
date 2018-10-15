'use strict';

(function () {

  var MAP_PIN_SIZE = {
    width: 65,
    height: 95
  };

  var COORDS_LIMIT = {
    top: 200,
    bottom: 700
  };

  var MAIN_PIN_TOP_OFFSET = 48;
  var TIMEOUT_DEFAULT = 500;
  var PINS_LIMIT = 5;
  var MARKER_LOCATION_X = 4;
  var MARKER_LOCATION_Y = 40;
  var LOW_PRICE = 10000;
  var HIGH_PRICE = 50000;

  var map = document.querySelector('.map');
  var mapPin = document.querySelectorAll('.map__pin');
  var mapPinMain = document.querySelector('.map__pin--main');
  var mapPinsCard = document.querySelector('.map__pins');
  var filterForm = document.querySelector('.map__filters');
  var filterType = filterForm.querySelector('#housing-type');
  var filterPrice = filterForm.querySelector('#housing-price');
  var filterRooms = filterForm.querySelector('#housing-rooms');
  var filterGuests = filterForm.querySelector('#housing-guests');
  var featuresFieldSet = filterForm.querySelector('#housing-features');
  var lastTimeout = null;

  // Границы перемещения метки
  var dragPinLimits = {
    minX: 50,
    maxX: map.clientWidth - 100,
    minY: COORDS_LIMIT.top - MAP_PIN_SIZE.height / 2,
    maxY: COORDS_LIMIT.bottom - MAP_PIN_SIZE.height / 2
  };

  var makeActive = function (elements, isActive) {
    for (var i = 0; i < elements.length; i++) {
      if (isActive) {
        elements[i].classList.add('map__pin--active');
      } else {
        elements[i].classList.remove('map__pin--active');
      }
    }
  };

  // Активируем метки
  var onPinBind = function (marker, offer) {
    makeActive(document.querySelectorAll('.map__pin.map__pin--active'), false);
    makeActive(marker, true);
    window.showCard.pinPopupClickHandler();
    window.showCard.showCard(offer);
  };

  var pinBind = function (marker, offer) {
    marker.addEventListener('click', function () {
      onPinBind([marker], offer);
    });
  };

  // Функция отрисовки меток на карте
  var renderMapPins = function (pinsList) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < pinsList.length && i < PINS_LIMIT; i++) {
      var pin = pinsList[i];
      var marker = document.createElement('button');
      marker.style.left = pin.location.x - MARKER_LOCATION_X + 'px';
      marker.style.top = pin.location.y - MARKER_LOCATION_Y + 'px';
      marker.className = 'map__pin';
      marker.innerHTML = '<img src = "' + pin.author.avatar + '" width="40" height="40" draggable="false">';
      pinBind(marker, pin);
      fragment.appendChild(marker);
    }
    mapPinsCard.appendChild(fragment);
  };

  var mapPinMainHandle = function (evt) {
    evt.preventDefault();

    // Исходные координаты курсора
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var shift = {};
    var markerCoords = {};

    // Функция перемещения метки
    var onMouseMove = function (move) {
      move.preventDefault();

      shift = {
        x: startCoords.x - move.clientX,
        y: startCoords.y - move.clientY
      };

      // Координаты положения метки
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
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      var address = document.querySelector('#address');
      address.value = 'x: ' + parseInt(mapPinMain.offsetLeft, 10) + ', ' + 'y: ' + (parseInt(mapPinMain.offsetTop, 10) + MAP_PIN_SIZE.height / 2);
      window.map.init();
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  mapPinMain.addEventListener('mousedown', mapPinMainHandle);

  // Удаляем пины
  var removePins = function () {
    var pins = mapPinsCard.querySelectorAll('.map__pin:not(.map__pin--main)');
    window.showCard.pinPopupClickHandler();
    for (var i = 0; i < pins.length; i++) {
      pins[i].remove();
    }
  };

  var debounce = function (callback, timeout) {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(callback, timeout);
  };

  // Блок с фильтрами
  var filterByType = function (offer, filter) {
    return (filter.type === offer.offer.type);
  };

  var filterByPrice = function (offer, filter) {
    var result = true;
    switch (filter.price) {
      case 'middle':
        if (offer.offer.price < LOW_PRICE || offer.offer.price > HIGH_PRICE) {
          result = false;
        }
        break;
      case 'low':
        if (offer.offer.price > LOW_PRICE) {
          result = false;
        }
        break;
      case 'high':
        if (offer.offer.price < HIGH_PRICE) {
          result = false;
        }
        break;
    }
    return result;
  };

  var filterByRooms = function (offer, filter) {
    return (parseInt(filter.rooms, 10) === parseInt(offer.offer.rooms, 10));
  };

  var filterByGuests = function (offer, filter) {
    return (parseInt(filter.guests, 10) === parseInt(offer.offer.guests, 10));
  };

  var filterByFeatures = function (offer, filter) {
    var result = true;
    filter.features.forEach(function (feature) {
      if (offer.offer.features.indexOf(feature) < 0) {
        result = false;
      }
    });
    return result;
  };

  filterForm.addEventListener('change', function () {

    var filters = {
      'type': filterType.value,
      'price': filterPrice.value,
      'rooms': filterRooms.value,
      'guests': filterGuests.value,
      'features': []
    };

    var offers = window.data.flats;
    var filtredOffers = offers;

    debounce(function () {
      removePins();

      var selectedFeatures = featuresFieldSet.querySelectorAll('input[type=checkbox]:checked');
      selectedFeatures.forEach(function (feature) {
        filters.features.push(feature.value);
      });

      if (filters.type !== 'any') {
        filtredOffers = filtredOffers.filter(function (offer) {
          return filterByType(offer, filters);
        });
      }

      if (filters.price !== 'any') {
        filtredOffers = filtredOffers.filter(function (offer) {
          return filterByPrice(offer, filters);
        });
      }

      if (filters.rooms !== 'any') {
        filtredOffers = filtredOffers.filter(function (offer) {
          return filterByRooms(offer, filters);
        });
      }

      if (filters.guests !== 'any') {
        filtredOffers = filtredOffers.filter(function (offer) {
          return filterByGuests(offer, filters);
        });
      }

      if (filters.features.length > 0) {
        filtredOffers = filtredOffers.filter(function (offer) {
          return filterByFeatures(offer, filters);
        });
      }

      renderMapPins(filtredOffers);
    }, TIMEOUT_DEFAULT);
  });

  window.pin = {
    renderMapPins: renderMapPins,
    makeActive: makeActive,
    mapPin: mapPin
  };

})();
