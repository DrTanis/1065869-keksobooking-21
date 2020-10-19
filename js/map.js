"use strict";

(function () {
  const mapElement = document.querySelector(`.map`);
  const mapPinElementList = document.querySelector(`.map__pins`);
  const formFilterElement = document.querySelector(`.map__filters`);
  const formFilterSelectElements = formFilterElement.querySelectorAll(`select`);
  const formFilterFieldsetElements = formFilterElement.querySelectorAll(`fieldset`);

  const enableMap = function () {
    if (mapElement.classList.contains(`map--faded`)) {
      window.form.enableElements(formFilterFieldsetElements);
      window.form.enableElements(formFilterSelectElements);
      mapPinElementList.appendChild(window.posts.create(window.posts.createArray()));
      mapElement.classList.remove(`map--faded`);
    }
  };

  const disableMap = function () {
    window.form.disableElements(formFilterFieldsetElements);
    window.form.disableElements(formFilterSelectElements);
    mapElement.classList.add(`map--faded`);
  };

  window.map = {
    enable: enableMap,
    disable: disableMap
  };
})();
