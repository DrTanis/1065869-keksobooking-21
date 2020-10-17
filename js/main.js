"use strict";

const pinMainElement = document.querySelector(`.map__pin--main`);
const formAddElement = document.querySelector(`.ad-form`);

const activateApp = function () {
  window.map.enableMap();
  window.form.enableFormAdd();
};

const deactivateApp = function () {
  window.map.disableMap();
  window.form.disableFormAdd();
};

const onClickMainPin = function () {
  activateApp();
  window.form.fillAddressInput();
  pinMainElement.removeEventListener(`click`, onClickMainPin);
};

const onEnterPressMainPin = function (evt) {
  if (evt.key === `Enter`) {
    activateApp();
    window.form.fillAddressInput();
    pinMainElement.removeEventListener(`keydown`, onEnterPressMainPin);
  }
};

const start = function () {
  deactivateApp();
  window.form.fillAddressInput();
  formAddElement.addEventListener(`click`, window.form.onFormAddSubmit);
  pinMainElement.addEventListener(`click`, onClickMainPin);
  pinMainElement.addEventListener(`keydown`, onEnterPressMainPin);
};

start();
