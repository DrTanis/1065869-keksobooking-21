"use strict";

(function () {
  const NUMBER_OF_POSTS = 8;
  let numberOfPosts = 1;
  const mapPinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
  const mapPinElementList = document.querySelector(`.map__pins`);

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
    numberOfPosts = (arrayOfData.length > NUMBER_OF_POSTS) ? NUMBER_OF_POSTS : arrayOfData.length;
    for (let i = 0; i < numberOfPosts; i++) {
      fragment.appendChild(createDomElem(arrayOfData[i]));
    }
    mapPinElementList.appendChild(fragment);
  };

  window.posts = {
    create: createPosts
  };
})();
