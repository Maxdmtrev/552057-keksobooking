'use strict';

(function () {
  var FORM_CHECKINS = ['12:00', '13:00', '14:00'];
  var FORM_CHECKOUTS = ['12:00', '13:00', '14:00'];
  var FORM_TYPES = ['flat', 'bungalo', 'house', 'palace'];
  var FORM_TYPES_PRICES = ['1000', '0', '5000', '10000'];
  var FORM_ROOM_NUMBERS = ['1', '2', '3', '100'];
  var FORM_ROOM_CAPACITIES = ['1', '2', '3', '0'];

  // Поля формы

  var formTypeFlat = document.querySelector('#type');
  var formPriceFlat = document.querySelector('#price');
  var formTimeIn = document.querySelector('#timein');
  var formTimeOut = document.querySelector('#timeout');
  var formRoomNumber = document.querySelector('#room_number');
  var formRoomCapacity = document.querySelector('#capacity');

  // Синхронизация атрибутов value

  function syncFormControlValues(element, value) {
    element.value = value;
  }

  // Задаем значение с минимальной ценой для квартиры

  function syncFormControlMinValues(element, value) {
    element.min = value;
  }

  // Синхронизируем поля формы

  function syncFormControls(firstControl, secondControl, firstOptions, secondOptions, callBackFunction) {
    function syncFormControlsClickHandler() {
      var indexOfValue = firstOptions.indexOf(firstControl.value);
      callBackFunction(secondControl, secondOptions[indexOfValue]);
    }

    firstControl.addEventListener('change', syncFormControlsClickHandler);
  }

  syncFormControls(formTimeIn, formTimeOut, FORM_CHECKINS, FORM_CHECKOUTS, syncFormControlValues);
  syncFormControls(formTimeOut, formTimeIn, FORM_CHECKOUTS, FORM_CHECKINS, syncFormControlValues);
  syncFormControls(formTypeFlat, formPriceFlat, FORM_TYPES, FORM_TYPES_PRICES, syncFormControlMinValues);
  syncFormControls(formRoomCapacity, formRoomNumber, FORM_ROOM_CAPACITIES, FORM_ROOM_NUMBERS, syncFormControlValues);

  // Проверка поля тип жилья

  var TYPE_PRICE = {
    'palace': 10000,
    'flat': 1000,
    'bungalo': 0,
    'house': 5000
  };

  function selectTypeChangeHandler() {
    formTypeFlat.addEventListener('change', function () {
      formPriceFlat.placeholder = TYPE_PRICE[formTypeFlat.value];
      formPriceFlat.min = TYPE_PRICE[formTypeFlat.value];
    });
  }

  selectTypeChangeHandler();

  // Проверка поля времени

  function validateTime() {
    if (formTimeIn.value !== formTimeOut.value) {
      formTimeIn.setCustomValidity('Время заезда  и время выезда должно совпадать');
    } else {
      formTimeIn.setCustomValidity('');
    }
  }

  validateTime();

  // Проверка поля количества комнат

  function checkValidationFlat() {
    formRoomCapacity.addEventListener('change', function () {
      var roomsValue = formRoomNumber.value;
      var capacityValue = formRoomCapacity.value;
      var errorMessage = '';

      if (roomsValue === '100' && capacityValue !== '0') {
        errorMessage = 'необходимо выбрать "не для гостей"';
      } else if (roomsValue !== '100' && capacityValue === '0') {
        errorMessage = 'необходимо выбрать как минимум 1 гостя, но не более ' + roomsValue + ' гостей';
      } else if (roomsValue < capacityValue) {
        errorMessage = 'необходимо выбрать не более ' + roomsValue + ' гостей';
      }
      formRoomCapacity.setCustomValidity(errorMessage);
    });
  }

  checkValidationFlat();
})();
