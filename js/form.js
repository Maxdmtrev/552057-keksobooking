'use strict';

(function () {
  var FORM_CHECKINS = ['12:00', '13:00', '14:00'];
  var FORM_CHECKOUTS = ['12:00', '13:00', '14:00'];
  var FORM_ROOM_NUMBERS = ['1', '2', '3', '100'];
  var FORM_ROOM_CAPACITIES = [[1], [1, 2], [1, 2, 3], [0]];
  var DEFAULT_AVATAR = 'img/avatars/default.png';
  var MIN_SYMBOLS = 30;
  var MAX_SYMBOLS = 100;
  var MAX_PRICE_FLAT = 1000000;
  var TIMEOUT = 2000;
  var SHOW_ERROR_TIMEOUT = 3500;
  var TYPE_PRICE = {
    'palace': 10000,
    'flat': 1000,
    'bungalo': 0,
    'house': 5000
  };

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

  // Активируем форму
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

  // Иницируем синхронизацию
  window.syncFilter.syncFormControls(formTimeIn, formTimeOut, FORM_CHECKINS, FORM_CHECKOUTS, window.syncFilter.syncFormControlValues);
  window.syncFilter.syncFormControls(formTimeOut, formTimeIn, FORM_CHECKOUTS, FORM_CHECKINS, window.syncFilter.syncFormControlValues);
  window.syncFilter.syncFormControls(formRoomNumber, formRoomCapacity, FORM_ROOM_NUMBERS, FORM_ROOM_CAPACITIES, window.syncFilter.setAllowedOptions);

  // Сообщение об ошибке заполнения поля
  var errorData = function (field, error) {
    field.style.border = (error) ? '1px solid red' : 'none';
  };

  // Показать сообщение об ошибке
  var showMessageError = function (onError) {
    var errorBlock = document.createElement('div');
    errorBlock.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    errorBlock.style.position = 'fixed';
    errorBlock.style.width = '100%';
    errorBlock.style.top = 0;
    errorBlock.style.left = 0;
    errorBlock.style.fontSize = '24px';
    errorBlock.style.color = 'white';
    errorBlock.textContent = onError;
    document.body.insertAdjacentElement('afterbegin', errorBlock);
    var removeErrorBlock = function () {
      errorBlock.classList.add('hidden');
    };
    setTimeout(removeErrorBlock, SHOW_ERROR_TIMEOUT);
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

  //
  var clearPhotoIcon = function () {
    var formPhotoIcon = formPhoto.querySelectorAll('img');
    for (var i = 0; i < formPhotoIcon.length; i++) {
      formPhotoIcon[i].remove();
    }
  };

  // Валидация формы при нажатии кнопки
  form.addEventListener('submit', function (evt) {
    evt.preventDefault();

    var errors = [];

    // Проверка поля адреса
    if (formAddress.value === '') {
      errorData(formAddress, true);
      errors.push(['formAddress', 'Заполните это поле']);
    } else {
      errorData(formAddress, false);
    }

    // Проверка поля описания
    if (formTitle.value.length < MIN_SYMBOLS || formTitle.value.length > MAX_SYMBOLS) {
      errorData(formTitle, true);
      errors.push(['formTitle', 'Заголовок должен быть не меньше 30 и не больше 100 символов']);
    } else {
      errorData(formTitle, false);
    }

    // Проверка поля цены
    if (parseInt(formPriceFlat.value, 10) < formPriceFlat.min || parseInt(formPriceFlat.value, 10) > MAX_PRICE_FLAT || isNaN(formPriceFlat.value, 10)) {
      errorData(formPriceFlat, true);
      errors.push(['formPriceFlat', 'Цена должна быть не меньше: ' + formPriceFlat.min + ' или не больше ' + MAX_PRICE_FLAT]);
    } else {
      errorData(formPriceFlat, false);
    }

    // Успешная отправка
    var onSuccess = function () {
      form.reset();
      var successMessage = document.querySelector('.success');
      successMessage.classList.remove('hidden');
      var hideSuccessMessage = function () {
        successMessage.classList.add('hidden');
      };
      setTimeout(hideSuccessMessage, TIMEOUT);
    };

    if (!errors.length) {
      window.backend.upLoad(new FormData(form), onSuccess, showMessageError);
    }
  });


  formTypeFlat.addEventListener('change', function () {
    formPriceFlat.placeholder = TYPE_PRICE[formTypeFlat.value];
    formPriceFlat.min = TYPE_PRICE[formTypeFlat.value];
  });


  avatar.addEventListener('change', function () {
    if (avatar.files && avatar.files[0]) {
      showImagePreview(document.querySelector('.ad-form-header__preview img'), avatar.files[0]);
    }
  });

  images.addEventListener('change', function () {
    clearPhotoIcon();
    [].forEach.call(images.files, (function (elem) {
      var imageIconPhoto = document.querySelector('.ad-form__photo');
      var imageIcon = document.createElement('img');
      imageIcon.style.maxHeight = '100%';
      imageIcon.style.maxWidth = '100%';
      showImagePreview(imageIcon, elem);
      imageIconPhoto.appendChild(imageIcon);
    }));
  });

  form.addEventListener('reset', function () {
    clearPhotoIcon();
    resetAvatar();
  });

  window.form = {
    fieldset: fieldset,
    avatar: avatar,
    images: images,
    disable: disable
  };

})();
