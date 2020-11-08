"use strict";

(function () {
  const pinMainElement = document.querySelector(`.map__pin--main`);
  const formAddElement = document.querySelector(`.ad-form`);

  const activateApp = function () {
    window.map.enable();
    window.form.enable();
  };

  const deactivateApp = function () {
    window.map.disable();
    window.form.disable();
  };

  const onClickMainPin = function () {
    activateApp();
    window.form.fillAddress();
    pinMainElement.removeEventListener(`click`, onClickMainPin);
  };

  const onEnterPressMainPin = function (evt) {
    if (evt.key === `Enter`) {
      activateApp();
      window.form.fillAddress();
      pinMainElement.removeEventListener(`keydown`, onEnterPressMainPin);
    }
  };

  const start = function () {
    deactivateApp();
    window.form.fillAddress();
    formAddElement.addEventListener(`click`, window.form.onSubmit);
    pinMainElement.addEventListener(`click`, onClickMainPin);
    pinMainElement.addEventListener(`keydown`, onEnterPressMainPin);
  };

  start();
  window.start = start;
})();
