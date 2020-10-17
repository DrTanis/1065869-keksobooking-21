/* eslint-disable object-shorthand */
"use strict";

(function () {
  const NUMBER_OF_POSTS = 8;
  const mapPinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
  const arrayOfPosts = [];

  const createPostsArray = function () {
    for (let i = 1; i <= NUMBER_OF_POSTS; i++) {
      const locationY = window.util.getRandomIntInclusive(window.data.LOCATIONS.y.MIN, window.data.LOCATIONS.y.MAX);
      const locationX = window.util.getRandomIntInclusive(window.data.LOCATIONS.x.MIN, window.data.LOCATIONS.x.MAX);
      arrayOfPosts[i - 1] = {
        author: {
          avatar: `img/avatars/user0` + i + `.png`,
        },
        offer: {
          title: `Lorem ipsum dolor sit.`,
          address: locationX + `, ` + locationY,
          price: window.util.getRandomIntInclusive(1000, 50000),
          type: window.util.getRandomArrayElement(window.data.ROOM_TYPE_LIST),
          rooms: window.util.getRandomIntInclusive(1, 3),
          guests: window.util.getRandomIntInclusive(1, 3),
          CHECKIN_LIST: window.util.getRandomArrayElement(window.data.CHECKIN_LIST),
          checkout: window.util.getRandomArrayElement(window.data.CHECKOUT_LIST),
          features: window.util.getArrayRandomLength(window.data.FEATURES),
          description: `Lorem ipsum dolor sit amet consectetur, adipisicing elit.`,
          photos: window.util.getArrayRandomLength(window.data.PHOTOS),
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

  window.posts = {
    createPostsArray: createPostsArray,
    createPosts: createPosts
  };
})();
