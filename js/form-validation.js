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

  //Задаем значение с минимальной ценой для квартиры

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

})();
