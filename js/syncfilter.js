'use strict';

(function () {

  // Синхронизируем атрибуты value
  var syncFormControlValues = function (element, value) {
    element.value = value;
  };

  // Задаем значение с минимальной ценой для квартиры
  var syncFormControlMinValues = function (element, value) {
    element.min = value;
  };

  // Синхронизируем поля фильтров
  var syncFormControls = function (firstControl, secondControl, firstOptions, secondOptions, callbackFunctions) {
    if (typeof callbackFunctions === 'function') {
      callbackFunctions(secondControl, secondOptions[firstOptions.indexOf(firstControl.value)]);
    }
    var syncFormControlsClickHandler = function () {
      var indexOfValue = firstOptions.indexOf(firstControl.value);
      callbackFunctions(secondControl, secondOptions[indexOfValue]);
    };
    firstControl.addEventListener('change', syncFormControlsClickHandler);
  };

  // Выбор поля для синхронизации
  var setAllowedOptions = function (element, allowedOptions) {
    var options = element.querySelectorAll('option');
    for (var i = 0; i < options.length; i++) {
      options[i].disable = allowedOptions.indexOf(parseInt(options[i].value, 10)) === -1;
    }
    element.value = allowedOptions[0];
  };

  window.syncFilter = {
    syncFormControlValues: syncFormControlValues,
    syncFormControlMinValues: syncFormControlMinValues,
    syncFormControls: syncFormControls,
    setAllowedOptions: setAllowedOptions
  };

})();
