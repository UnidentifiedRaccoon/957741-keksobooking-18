'use strict';
(function () {
  var ENTER_KEYCODE = 13;
  var ESC_KEYCODE = 27;
  var errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');
  var successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
  var main = document.querySelector('main');
  var isEnterEvent = function (evt, action) {
    if (evt.keyCode === ENTER_KEYCODE) {
      action();
    }
  };
  var isEscEvent = function (evt, action) {
    if (evt.keyCode === ESC_KEYCODE) {
      action();
    }
  };

// Функция для вывода сообщения об ошибке
  var onErrorMessage = function (message) {
    // Клонирование шаблона сообщения
    var errorPopup = errorMessageTemplate.cloneNode(true);
    // Изменение текстового содержания
    var errorPopupMessage = errorPopup.querySelector('.error__message');
    errorPopupMessage.textContent = message;
    // Вставка сообщения на страницу
    main.appendChild(errorPopup);

    // Функция - обработчик click для удаления сообщения об успехе
    var onWindowClick = function() {
      try {
        main.removeChild(errorPopup);
        console.log('пока работаю');
      } catch (e) {
        console.log('поймл ошибку');
      } finally {
        window.removeEventListener('click', onWindowClick);
      }
    };
    //  Обработчик click
    window.addEventListener('click', onWindowClick);

    // Функция - обработчик keydown для удаления сообщения об успехе
    var onWindowEsc = function(evt) {
      if (evt.keyCode === ESC_KEYCODE) {
        try {
          main.removeChild(errorPopup);
          console.log('пока работаю');
        } catch (e) {
          console.log('поймл ошибку');
        } finally {
          window.removeEventListener('keydown', onWindowEsc);
        }
      }
    };
    // Обработчик keydown
    window.addEventListener('keydown', onWindowEsc);
  };

// Функция для вывода сообщения об успешной операции
  var onSuccessMessage = function () {
    // Клонирование шаблона сообщения
    var successPopup = successMessageTemplate.cloneNode(true);
    // Вставка сообщения на страницу
    main.appendChild(successPopup);

    // Функция - обработчик click для удаления сообщения об успехе
    var onWindowClick = function() {
      try {
        main.removeChild(successPopup);
        console.log('пока работаю');
      } catch (e) {
        console.log('поймл ошибку');
      } finally {
        window.removeEventListener('click', onWindowClick);
      }
    };
    //  Обработчик click
    window.addEventListener('click', onWindowClick);

    // Функция - обработчик keydown для удаления сообщения об успехе
    var onWindowEsc = function(evt) {
      if (evt.keyCode === ESC_KEYCODE) {
        try {
          main.removeChild(successPopup);
          console.log('пока работаю');
        } catch (e) {
          console.log('поймл ошибку');
        } finally {
          window.removeEventListener('keydown', onWindowEsc);
        }
      }
    };
    // Обработчик keydown
    window.addEventListener('keydown', onWindowEsc);
  };

  window.util = {
    isEnterEvent: isEnterEvent,
    isEscEvent: isEscEvent,
    map: document.querySelector('.map'),
    onErrorMessage: onErrorMessage,
    onSuccessMessage: onSuccessMessage,
  };
})();
