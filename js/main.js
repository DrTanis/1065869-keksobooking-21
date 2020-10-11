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
const arrayOfPosts = [];

const mapPinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
const mapPinElementList = document.querySelector(`.map__pins`);
const mapElement = document.querySelector(`.map`);

const showMap = function () {
  mapElement.classList.remove(`map--faded`);
};

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
        guests: getRandomIntInclusive(2, 6),
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

const start = function () {
  showMap();
  mapPinElementList.appendChild(createPosts(createPostsArray()));
};

start();
