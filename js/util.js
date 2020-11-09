"use strict";

(function () {
  const errorElement = document.createElement(`div`);
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
    },
    showError: function (error) {
      errorElement.style.position = `absolute`;
      errorElement.style.left = `0`;
      errorElement.style.right = `0`;
      errorElement.style = `padding: 5px 0; z-index: 100; text-align: center; background-color: red; color: white`;
      errorElement.style.fontSize = `16px`;
      errorElement.textContent = error;
      errorElement.style.display = `block`;
      document.body.insertAdjacentElement(`afterbegin`, errorElement);
    },
    hideError: function () {
      errorElement.style.display = `none`;
    },
  };
})();
