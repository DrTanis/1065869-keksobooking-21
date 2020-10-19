"use strict";

(function () {
  window.util = {
    getRandomIntInclusive: function (min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min; // Максимум и минимум включаются
    },
    getRandomArrayElement: function (array) {
      return array[Math.floor(Math.random() * array.length)];
    },
    getArrayRandomLength: function (array) {
      return array.slice(0, window.util.getRandomIntInclusive(1, array.length));
    }
  };
})();
