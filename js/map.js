/* eslint-disable object-shorthand */
"use strict";

(function () {
  const mapElement = document.querySelector(`.map`);
  const mapPinElementList = document.querySelector(`.map__pins`);
  const formFilterElement = document.querySelector(`.map__filters`);
  const formFilterSelectElements = formFilterElement.querySelectorAll(`select`);
  const formFilterFieldsetElements = formFilterElement.querySelectorAll(`fieldset`);

  const enableMap = function () {
    if (mapElement.classList.contains(`map--faded`)) {
      window.form.enableFormElements(formFilterFieldsetElements);
      window.form.enableFormElements(formFilterSelectElements);
      mapPinElementList.appendChild(window.posts.createPosts(window.posts.createPostsArray()));
      mapElement.classList.remove(`map--faded`);
    }
  };

  const disableMap = function () {
    window.form.disableFormElements(formFilterFieldsetElements);
    window.form.disableFormElements(formFilterSelectElements);
    mapElement.classList.add(`map--faded`);
  };

  window.map = {
    enableMap: enableMap,
    disableMap: disableMap
  };
})();
