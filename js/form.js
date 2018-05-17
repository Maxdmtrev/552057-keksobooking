'use strict';

(function () {
  var FORM_CHECKINS = ['12:00', '13:00', '14:00'];
  var FORM_CHECKOUTS = ['12:00', '13:00', '14:00'];
  var FORM_TYPES = ['flat', 'bungalo', 'house', 'palace'];
  var FORM_TYPES_PRICES = ['1000', '0', '5000', '10000'];
  var FORM_ROOM_NUMBERS = ['1', '2', '3', '100'];
  var FORM_ROOM_CAPACITIES = ['1', '2', '3', '0'];
  var DEFAULT_AVATAR = 'img/avatars/default.png';

  // Поля формы
  var form = document.querySelector('.ad-form');
  var formTypeFlat = document.querySelector('#type'); // тип
  var formPriceFlat = document.querySelector('#price'); // цена
  var formTimeIn = document.querySelector('#timein'); // время заезда
  var formTimeOut = document.querySelector('#timeout'); // время выезда
  var formRoomNumber = document.querySelector('#room_number'); // количество комнат
  var formRoomCapacity = document.querySelector('#capacity'); // вместимость
  var formAddress = document.querySelector('#address'); // адрес
  var formTitle = document.querySelector('#title'); // заголовок
  var formPhoto = document.querySelector('.ad-form__photo-container'); // фото-контейнер
  var fieldset = document.querySelectorAll('fieldset'); // поля
  var avatar = document.querySelector('#avatar'); // аватар
  var images = document.querySelector('#images'); // изображения

  var disable = function (isDisable) {
    if (isDisable) {
      form.classList.add('ad-form--disabled');
    } else {
      form.classList.remove('ad-form--disabled');
    }
    for (var i = 0; i < fieldset.length; i++) {
      fieldset[i].disabled = isDisable;
    }
  };
  disable(true);

  // Синхронизация атрибутов value
  function syncFormControlValues(element, value) {
    element.value = value;
  }

  // Задаем значение с минимальной ценой для квартиры
  function syncFormControlMinValues(element, value) {
    element.min = value;
  }

  // Синхронизируем поля формы
  function syncFormControls(firstControl, secondControl, firstOptions, secondOptions, callbackFunctions) {
    function syncFormControlsClickHandler() {
      var indexOfValue = firstOptions.indexOf(firstControl.value);
      callbackFunctions(secondControl, secondOptions[indexOfValue]);
    }
    firstControl.addEventListener('change', syncFormControlsClickHandler);
  }
  var initFieldSync = function (addListener) {
    syncFormControls(formTimeIn, formTimeOut, FORM_CHECKINS, FORM_CHECKOUTS, syncFormControlValues, addListener);
    syncFormControls(formTimeOut, formTimeIn, FORM_CHECKOUTS, FORM_CHECKINS, syncFormControlValues, addListener);
    syncFormControls(formTypeFlat, formPriceFlat, FORM_TYPES, FORM_TYPES_PRICES, syncFormControlMinValues, addListener);
    syncFormControls(formRoomNumber, formRoomCapacity, FORM_ROOM_NUMBERS, FORM_ROOM_CAPACITIES, syncFormControlValues, addListener);
    syncFormControls(formRoomCapacity, formRoomNumber, FORM_ROOM_CAPACITIES, FORM_ROOM_NUMBERS, syncFormControlValues, addListener);
  };
  initFieldSync(true);

  var errorData = function (field, error) {
    field.style.border = (error) ? '1px solid red' : 'none';
  };

  var errorHandler = function (message) {
    var elem = document.createElement('DIV');
    elem.style = 'z.index: 100; margin: 0 auto; text-align: center; background-color: red; color: white; font-size: 20px; ' +
    'position: fixed; left: 0; top: 0; width: 100%; padding: 10px;';
    elem.textContent = 'Ошибка отправки формы: ' + message;
    document.body.insertAdjacentHTML('afterbegin', elem);
  };

  var clearForm = function () {
    form.reset();
  };

  var resetAvatar = function () {
    var newAvatar = document.querySelector('.ad-form-header__preview img');
    newAvatar.src = DEFAULT_AVATAR;
  };

  var showImagePreview = function (image, file) {
    var reader = new FileReader();
    reader.onload = function (evt) {
      image.src = evt.target.result;
    };
    reader.readAsDataURL(file);
  };

  var clearPhotoIcon = function () {
    var formPhotoIcon = formPhoto.querySelectorAll('.icon');
    for (var i = 0; i < formPhotoIcon.length; i++) {
      formPhotoIcon[i].remove();
    }
  };

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    var errors = [];

    // Проверка поля адреса
    if (formAddress.value === '') {
      errorData(formAddress, true);
      errors.push(['formAddress', 'Заполните это поле']);
    } else {
      errorData(formAddress, false);
    }

    // Проверка поля описания
    if (formTitle.value.length < 30 || formTitle.value.length > 100) {
      errorData(formTitle, true);
      errors.push(['formTitle', 'Заголовок должен быть не меньше 30 и не больше 100 символов']);
    } else {
      errorData(formTitle, false);
    }

    // Проверка поля цены
    if (parseInt(formPriceFlat.value, 10) < formPriceFlat.min || parseInt(formPriceFlat.value, 10) > 1000000 || isNaN(formPriceFlat.value, 10)) {
      errorData(formPriceFlat, true);
      errors.push(['formPriceFlat', 'Цена должна быть не меньше: ' + formPriceFlat.min + ' или не больше ' + 1000000]);
    } else {
      errorData(formPriceFlat, false);
    }

    if (!errors.length) {
      window.backend.upLoad(new FormData(form), clearForm, errorHandler);
    }
  });

  avatar.addEventListener('change', function () {
    if (avatar.files && avatar.files[0]) {
      showImagePreview(document.querySelector('.ad-form-header__preview img'), avatar.files[0]);
    }
  });

  images.addEventListener('change', function () {
    clearPhotoIcon();
    if (images.files.length > 0) {
      for (var i = 0; i < images.files.length; i++) {
        var imageIconPhoto = document.querySelector('.ad-form__photo');
        var imageIconContainer = document.createElement('div');
        var imageIcon = document.createElement('img');
        imageIconContainer.classList.add('icon');
        imageIconContainer.style.height = '100px';
        imageIcon.style.maxWidth = '85%';
        imageIcon.style.margin = '10px 5px 5px 5px';
        imageIcon.style.maxHeight = '120%';
        showImagePreview(imageIcon, images.files[i]);
        imageIconContainer.appendChild(imageIcon);
        imageIconPhoto.appendChild(imageIconContainer);
      }
    }
  });

  form.addEventListener('reset', function () {
    clearPhotoIcon();
    resetAvatar();
  });

  // Проверка поля тип жилья
  var TYPE_PRICE = {
    'palace': 10000,
    'flat': 1000,
    'bungalo': 0,
    'house': 5000
  };

  // Проверка поля тип-цена
  function selectTypeChangeHandler() {
    formTypeFlat.addEventListener('change', function () {
      formPriceFlat.placeholder = TYPE_PRICE[formTypeFlat.value];
      formPriceFlat.min = TYPE_PRICE[formTypeFlat.value];
    });
  }
  selectTypeChangeHandler();

  // Проверка поля количества комнат
  function checkValidationFlat() {
    formRoomCapacity.addEventListener('change', function () {
      var roomsValue = parseInt(formRoomNumber.value, 10);
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

  window.form = {
    fieldset: fieldset,
    avatar: avatar,
    images: images,
    disable: disable,
    errorHandler: errorHandler
  };
})();