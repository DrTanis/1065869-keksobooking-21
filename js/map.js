"use strict";

(function () {
  const mapElement = document.querySelector(`.map`);
  const formFilterElement = document.querySelector(`.map__filters`);
  const formFilterSelectElements = formFilterElement.querySelectorAll(`select`);
  const formFilterFieldsetElements = formFilterElement.querySelectorAll(`fieldset`);

  const onLoadSuccess = function (data) {
    window.posts.create(data);
  };

  const enableMap = function () {
    if (mapElement.classList.contains(`map--faded`)) {
      window.form.enableElements(formFilterFieldsetElements);
      window.form.enableElements(formFilterSelectElements);
      window.server.download(window.util.showError, onLoadSuccess);
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
