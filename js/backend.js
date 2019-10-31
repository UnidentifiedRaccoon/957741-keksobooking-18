'use strict';

(function () {
  var URL_LOAD = 'https://js.dump.academy/keksobooking/data';
  // var URL_SAVE = 'https://js.dump.academy/code-and-magick';

  var makeHttpReques = function (method, url, onLoad, onError, data) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.open(method, url);
    xhr.timeout = 10000; // 10s
    if (data === undefined) {
      xhr.send();
    } else {
      xhr.send(data);
    }

    xhr.addEventListener('load', function () {
      switch (true) {
        case (xhr.status < 400):
          onLoad(xhr.response);
          break;
        default:
          var errorMessage = 'Cтатус ответа: : ' + xhr.status + ' ' + xhr.statusText;
          onError(errorMessage);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });
  };

  window.backend = {
    load: function (onLoad, onError) {
      makeHttpReques('GET', URL_LOAD, onLoad, onError);
    }
    // save: function (data, onLoad, onError) {
    //   makeHttpReques('POST', URL_SAVE, onLoad, onError, data);
    // }
  };
})();
