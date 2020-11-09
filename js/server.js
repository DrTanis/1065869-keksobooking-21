"use strict";

(function () {
  const LOAD_URL = `https://21.javascript.pages.academy/keksobooking/data`;
  const SUCCESS_CODE = 200;
  const REQUEST_TIMEOUT = 10000;
  const XHR_RESPONSE_TYPE = `json`;

  const onXhrLoad = function (status, text) {
    switch (status) {
      case SUCCESS_CODE:
        return {
          error: false,
          msg: ``
        };
      case 301:
        return {
          error: true,
          msg: `Запрашиваемый ресурс был перемещен на другой адрес.`
        };
      case 302:
        return {
          error: true,
          msg: `Запрашиваемый ресурс был временно перемещен на другой адрес.`
        };
      case 400:
        return {
          error: true,
          msg: `Произошла ошибка в запросе.`
        };
      case 404:
        return {
          error: true,
          msg: `Запрашиваемый ресурс не найден.`
        };
      case 500:
        return {
          error: true,
          msg: `Произошла внутренняя ошибка сервера.`
        };
      case 503:
        return {
          error: true,
          msg: `Сервер недоступен.`
        };
      default:
        return {
          error: true,
          msg: `Произошла непредвиденная ошибка: ` + status + ` ` + text
        };
    }
  };

  const onXhrError = function () {
    return `Произошла ошибка соединения.`;
  };

  const onXhrTimeout = function () {
    return `Не удалось выполнить запрос за ` + REQUEST_TIMEOUT / 1000 + `секунд.`;
  };

  const xhrHandle = function (method, url, onError, onLoad, data) {
    const xhr = new XMLHttpRequest();
    xhr.responseType = XHR_RESPONSE_TYPE;
    xhr.timeout = REQUEST_TIMEOUT;
    xhr.addEventListener(`load`, function () {
      const result = onXhrLoad(xhr.status, xhr.statusText);
      if (result.error) {
        onError(result.msg);
      } else {
        onLoad(xhr.response);
      }
    });

    xhr.addEventListener(`error`, function () {
      onError(onXhrError());
    });

    xhr.addEventListener(`timeout`, function () {
      onError(onXhrTimeout());
    });

    xhr.open(method, url);
    xhr.send(data);
  };

  const downloadData = function (onError, onLoad) {
    xhrHandle(`GET`, LOAD_URL, onError, onLoad);
  };

  window.server = {
    download: downloadData
  };
})();
