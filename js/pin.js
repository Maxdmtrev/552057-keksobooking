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
  /* var ENTER_BUTTON = 13; */
  var map = document.querySelector('.map'); // карта
  var mapPin = document.querySelectorAll('.map__pin'); //
  var mapPinMain = document.querySelector('.map__pin--main'); // главная метка
  var mapPinsCard = document.querySelector('.map__pins'); // блок в котром будут отображены сгенерированные элементы
  var lastTimeout = null;

  var filterForm = document.querySelector('.map__filters');
  var filterType = filterForm.querySelector('#housing-type');
  var filterPrice = filterForm.querySelector('#housing-price');
  var filterRooms = filterForm.querySelector('#housing-rooms');
  var filterGuests = filterForm.querySelector('#housing-guests');
  var featuresFieldset = filterForm.querySelector('#housing-features');

  // Активируем метки
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
    window.showCard.removeCard();
    window.showCard.showCard(offer);
  };

  var pinBind = function (marker, offer) {
    marker.addEventListener('click', function () {
      onPinBind([marker], offer);
    });
  };

  // Функция создающая метки
  function renderMapPins(pinsList) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < pinsList.legth && i < PINS_LIMIT; i++) {
      var pin = pinsList[i];
      var marker = document.createElement('button');
      marker.style.left = pin.location.x - 4 + 'px';
      marker.style.top = pin.location.y - 40 + 'px';
      marker.className = 'map__pin';
      marker.innerHTML = '<img src = "' + pin.author.avatar + '" width="40" height="40" draggable="flase">';
      pinBind(marker, pin);
      fragment.appendChild(marker);
    }
    mapPinsCard.appendChild(fragment);
  }
  /*
  // Скрываем метки после загрузки страницы
  mapPin.forEach(function (hide) {
    hide.style.display = 'none';
    hide.classList.remove('map__pin--active');
  });

  // Главная метка видна после загрузки страницы
  mapPinMain.style.display = 'block';

  // Добавляем класс метке по клику
  mapPin.forEach(function (pin) {
    pin.addEventListener('click', function (ad) {
      mapPin.forEach(function () {
        mapPinMain.classList.remove('map__pin--active');
        pin.className = pin.className.replace('map__pin--active', '');
        ad.currentTarget.classList.add('map__pin--active');
      });
    });
  });

  // Добавляем активный класс метке по нажатию ENTER
  mapPin.forEach(function (elem) {
    elem.addEventListener('keydown', function (ent) {
      mapPin.forEach(function (p) {
        if (ent.keyCode === ENTER_BUTTON) {
          p.className = p.className.replace('map__pin--active', '');
          ent.currentTarget.classList.add('map__pin--active');
        }
      });
    });
  });
*/


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

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      window.address = document.querySelector('#address');
      window.address.value = 'x: ' + parseInt(mapPinMain.offsetLeft, 10) + ', ' + 'y: ' + (parseInt(mapPinMain.offsetTop, 10) + MAP_PIN_SIZE.height / 2);
      window.map.init();
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  }
  mapPinMain.addEventListener('mousedown', mapPinMainHandle);

  // Удаляем пины
  var removePins = function () {
    var pins = mapPinsCard.querySelectorAll('.map__pin:not(.map__pin--main)');
    window.showCard.removeCard();
    pins.forEach(function (e) {
      e.remove();
    });
  };

  function debounce(callback, timeout) {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(callback, timeout);
  }

  function filterByType(offer, filter) {
    return (filter.type === offer.offer.type);
  }

  function filterByPrice(offer, filter) {
    var result = true;
    switch (filter.price) {
      case 'middle':
        if (offer.offer.price < 10000 || offer.offer.price > 50000) {
          result = false;
        }
        break;
      case 'high':
        if (offer.offer.price < 50000) {
          result = false;
        }
        break;
    }
    return result;
  }

  function filterByRooms(offer, filter) {
    return (parseInt(filter.rooms, 10) === parseInt(offer.offer.rooms, 10));
  }

  function filterByGuests(offer, filter) {
    return (parseInt(filter.guests, 10) === parseInt(offer.offer.guests, 10));
  }

  function filterByFeatures(offer, filter) {
    var result = true;
    filter.features.forEach(function (feature) {
      if (offer.offer.features.indexOf(feature) < 0) {
        result = false;
      }
    });
    return result;
  }

  filterForm.addEventListener('change', function () {
    debounce(function () {
      removePins();

      var filters = {
        'type': filterType.value,
        'price': filterPrice.value,
        'rooms': filterRooms.value,
        'guests': filterGuests.value,
        'features': []
      };

      var selectedFeatures = featuresFieldset.querySelectorAll('input[type=checkbox]:checked');
      selectedFeatures.forEach(function (feature) {
        filters.features.push(feature.value);
      });

      var offers = window.data.flats;
      var filtredOffers = offers;

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
    mapPin: mapPin,
    map: map,
    mapPinsCard: mapPinsCard
  };

})();
