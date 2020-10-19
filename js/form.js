"use strict";

(function () {
  const MAP_PIN_MAIN_POINTER = 21.6;
  const mapElement = document.querySelector(`.map`);
  const pinMainElement = document.querySelector(`.map__pin--main`);
  const formAddElement = document.querySelector(`.ad-form`);
  const formAddFieldsetElements = formAddElement.querySelectorAll(`fieldset`);
  const addressElement = formAddElement.querySelector(`#address`);
  const roomsSelectElement = formAddElement.querySelector(`#room_number`);
  const guestsSelectElement = formAddElement.querySelector(`#capacity`);

  const fillAddressInput = function () {
    const top = pinMainElement.offsetTop;
    const coordX = Math.round(pinMainElement.offsetLeft + pinMainElement.offsetWidth / 2);
    const coordY = !mapElement.classList.contains(`map--faded`) ? Math.round(top + pinMainElement.offsetHeight + MAP_PIN_MAIN_POINTER) : Math.round(top + pinMainElement.offsetHeight / 2);

    addressElement.value = coordX + `, ` + coordY;
  };

  const enableFormElements = function (nodeList) {
    for (let i = 0; i < nodeList.length; i++) {
      nodeList[i].removeAttribute(`disabled`);
    }
  };

  const disableFormElements = function (nodeList) {
    for (let i = 0; i < nodeList.length; i++) {
      nodeList[i].setAttribute(`disabled`, `disabled`);
    }
  };

  const enableFormAdd = function () {
    if (formAddElement.classList.contains(`ad-form--disabled`)) {
      enableFormElements(formAddFieldsetElements);
      formAddElement.classList.remove(`ad-form--disabled`);
    }
  };

  const disableFormAdd = function () {
    disableFormElements(formAddFieldsetElements);
    formAddElement.classList.add(`ad-form--disabled`);
  };

  const roomsGuestsValidate = function () {
    const rooms = parseInt(roomsSelectElement.value, 10);
    const guests = parseInt(guestsSelectElement.value, 10);
    let msg = ``;
    switch (rooms) {
      case 1:
        if (!window.data.guestsInRooms.one.includes(guests)) {
          msg = `Количество гостей должно быть равно 1`;
        }
        break;
      case 2:
        if (!window.data.guestsInRooms.two.includes(guests)) {
          msg = `Количество гостей должно быть 1 или 2`;
        }
        break;
      case 3:
        if (!window.data.guestsInRooms.three.includes(guests)) {
          msg = `Количество гостей должно быть 1, 2 или 3`;
        }
        break;
      case 100:
        if (!window.data.guestsInRooms.hundred.includes(guests)) {
          msg = `100 комнат предназначены не для гостей`;
        }
    }
    return msg;
  };

  const onFormAddSubmit = function () {
    guestsSelectElement.setCustomValidity(roomsGuestsValidate());
  };

  window.form = {
    enableElements: enableFormElements,
    disableElements: disableFormElements,
    fillAddress: fillAddressInput,
    onSubmit: onFormAddSubmit,
    enable: enableFormAdd,
    disable: disableFormAdd
  };
})();
