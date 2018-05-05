'use strict';

(function () {
  // Функция генерирующая случайное число

  window.getRandomNumber = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  // Получение случайного элемента массива

  window.getRandomItem = function (array) {
    var randomItem = Math.floor(Math.random() * array.length);
    return array[randomItem];
  };
})();
