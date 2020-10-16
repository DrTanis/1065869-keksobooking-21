"use strict";

const NUMBER_OF_POSTS = 8;
const CHECKIN_LIST = [`12:00`, `13:00`, `14:00`];
const CHECKOUT_LIST = [`12:00`, `13:00`, `14:00`];
const ROOM_TYPE_LIST = [`palace`, `flat`, `house`, `bungalo`];
const FEATURES = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
const PHOTOS = [
  `http://o0.github.io/assets/images/tokyo/hotel1.jpg`,
  `http://o0.github.io/assets/images/tokyo/hotel2.jpg`,
  `http://o0.github.io/assets/images/tokyo/hotel3.jpg`,
];
const LOCATIONS = {
  x: {
    MIN: 0,
    MAX: 1150
  },
  y: {
    MIN: 130,
    MAX: 630
  }
};

const guestsInRooms = {
  one: [1],
  two: [1, 2],
  three: [1, 2, 3],
  hundred: [0]
};

const arrayOfPosts = [];

const mapElement = document.querySelector(`.map`);
const mapPinElementList = document.querySelector(`.map__pins`);
const pinMainElement = document.querySelector(`.map__pin--main`);
const mapPinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);

const formAddElement = document.querySelector(`.ad-form`);
const formAddFieldsetElements = formAddElement.querySelectorAll(`fieldset`);
const addressElement = formAddElement.querySelector(`#address`);
const roomsSelectElement = formAddElement.querySelector(`#room_number`);
const guestsSelectElement = formAddElement.querySelector(`#capacity`);
const formFilterElement = document.querySelector(`.map__filters`);
const formFilterSelectElements = formFilterElement.querySelectorAll(`select`);
const formFilterFieldsetElements = formFilterElement.querySelectorAll(`fieldset`);


const getRandomIntInclusive = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; // Максимум и минимум включаются
};

const getRandomArrayElement = function (array) {
  return array[Math.floor(Math.random() * array.length)];
};

const getArrayRandomLength = function (array) {
  return array.slice(0, getRandomIntInclusive(1, array.length));
};


const createPostsArray = function () {
  for (let i = 1; i <= NUMBER_OF_POSTS; i++) {
    const locationY = getRandomIntInclusive(LOCATIONS.y.MIN, LOCATIONS.y.MAX);
    const locationX = getRandomIntInclusive(LOCATIONS.x.MIN, LOCATIONS.x.MAX);
    arrayOfPosts[i - 1] = {
      author: {
        avatar: `img/avatars/user0` + i + `.png`,
      },
      offer: {
        title: `Lorem ipsum dolor sit.`,
        address: locationX + `, ` + locationY,
        price: getRandomIntInclusive(1000, 50000),
        type: getRandomArrayElement(ROOM_TYPE_LIST),
        rooms: getRandomIntInclusive(1, 3),
        guests: getRandomIntInclusive(1, 3),
        CHECKIN_LIST: getRandomArrayElement(CHECKIN_LIST),
        checkout: getRandomArrayElement(CHECKOUT_LIST),
        features: getArrayRandomLength(FEATURES),
        description: `Lorem ipsum dolor sit amet consectetur, adipisicing elit.`,
        photos: getArrayRandomLength(PHOTOS),
      },
      location: {
        x: locationX,
        y: locationY
      },
    };
  }
  return arrayOfPosts;
};

const createDomElem = function (objJS) {
  const arrayElement = mapPinTemplate.cloneNode(true);
  const arrayImg = arrayElement.querySelector(`img`);
  const coordX = objJS.location.x + arrayImg.width / 2;
  const coordY = objJS.location.y + arrayImg.height;
  arrayElement.style = `left: ` + coordX + `px; top: ` + coordY + `px;`;
  arrayImg.src = objJS.author.avatar;
  arrayImg.alt = objJS.offer.title;
  return arrayElement;
};

const createPosts = function (arrayOfData) {
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < arrayOfData.length; i++) {
    fragment.appendChild(createDomElem(arrayOfData[i]));
  }
  return fragment;
};

const fillAddressInput = function () {
  const top = pinMainElement.offsetTop;
  const coordX = Math.round(pinMainElement.offsetLeft + pinMainElement.offsetWidth / 2);
  const coordY = !mapElement.classList.contains(`map--faded`) ? Math.round(top + pinMainElement.offsetHeight + 21.6) : Math.round(top + pinMainElement.offsetHeight / 2);

  addressElement.value = coordX + `, ` + coordY;
};

const disableFormElements = function (nodeList) {
  for (let i = 0; i < nodeList.length; i++) {
    nodeList[i].setAttribute(`disabled`, `disabled`);
  }
};

const enableFormElements = function (nodeList) {
  for (let i = 0; i < nodeList.length; i++) {
    nodeList[i].removeAttribute(`disabled`);
  }
};

const enableMap = function () {
  if (mapElement.classList.contains(`map--faded`)) {
    enableFormElements(formFilterFieldsetElements);
    enableFormElements(formFilterSelectElements);
    mapPinElementList.appendChild(createPosts(createPostsArray()));
    mapElement.classList.remove(`map--faded`);
  }
};

const disableMap = function () {
  disableFormElements(formFilterFieldsetElements);
  disableFormElements(formFilterSelectElements);
  mapElement.classList.add(`map--faded`);
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

const activateApp = function () {
  enableMap();
  enableFormAdd();
};

const deactivateApp = function () {
  disableMap();
  disableFormAdd();
};

const onClickMainPin = function () {
  activateApp();
  fillAddressInput();
  pinMainElement.removeEventListener(`click`, onClickMainPin);
};

const onEnterPressMainPin = function (evt) {
  if (evt.key === `Enter`) {
    activateApp();
    fillAddressInput();
    pinMainElement.removeEventListener(`keydown`, onEnterPressMainPin);
  }
};


const roomsGuestsValidate = function () {
  const rooms = parseInt(roomsSelectElement.value, 10);
  const guests = parseInt(guestsSelectElement.value, 10);
  let msg = ``;
  switch (rooms) {
    case 1:
      if (!guestsInRooms.one.includes(guests)) {
        msg = `Количество гостей должно быть равно 1`;
      }
      break;
    case 2:
      if (!guestsInRooms.two.includes(guests)) {
        msg = `Количество гостей должно быть 1 или 2`;
      }
      break;
    case 3:
      if (!guestsInRooms.three.includes(guests)) {
        msg = `Количество гостей должно быть 1, 2 или 3`;
      }
      break;
    case 100:
      if (!guestsInRooms.hundred.includes(guests)) {
        msg = `100 комнат предназначены не для гостей`;
      }
  }
  return msg;
};

const onFormAddSubmit = function () {
  guestsSelectElement.setCustomValidity(roomsGuestsValidate());
};


const start = function () {
  deactivateApp();
  fillAddressInput();
  formAddElement.addEventListener(`click`, onFormAddSubmit);
  pinMainElement.addEventListener(`click`, onClickMainPin);
  pinMainElement.addEventListener(`keydown`, onEnterPressMainPin);
};

start();
