'use strict';

(function () {
  var adForm = document.querySelector('.ad-form');
  var filterForm = document.querySelector('.map__filters');
  var mainMapPin = document.querySelector('.map__pin--main');
  var inputAddress = adForm.querySelector('#address');
  var MAIN_LOCATION_Y_OFFSET = mainMapPin.offsetHeight;
  var MAIN_LOCATION_X_OFFSET = mainMapPin.offsetWidth;

  // Функция для удаления указанного атрибута во всех элементах(детях) указаннного родителя
  var removeChildrenAttribute = function (parent, attr) {
    var children = parent.querySelectorAll('[' + attr + ']');
    for (var j = 0; j < children.length; j++) {
      children[j].removeAttribute(attr);
    }
  };

  // Функция для перевода страницы в активное сосотояние
  var makeActivePage = function () {
    // Удаление неактивной CSS стилизиции
    window.util.map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    // Удаление атрибутов disabled у всех элементов форм
    removeChildrenAttribute(filterForm, 'disabled');
    removeChildrenAttribute(adForm, 'disabled');
    // Заполнение поля адрес координатами главного пина
    inputAddress.value = getPointIndicateByMainMapPin(mainMapPin.style.top, mainMapPin.style.left);
    // JS валидация формы
    window.validation.allValidation();
  };

  // Подучение координат из CSS свойств элемента
  var getPointIndicateByMainMapPin = function (top, left) {
    left = parseInt(left, 10) + MAIN_LOCATION_X_OFFSET / 2;
    if (window.util.map.classList.contains('map--faded')) {
      top = parseInt(top, 10) + MAIN_LOCATION_Y_OFFSET / 2;
    } else {
      top = parseInt(top, 10) + MAIN_LOCATION_Y_OFFSET;
    }
    return Math.floor(left) + ', ' + Math.floor(top);
  };

  // Запись изначальных координат в поле адреса
  inputAddress.value = getPointIndicateByMainMapPin(mainMapPin.style.top, mainMapPin.style.left);

  // Обработчики клика и ENTER'a для перевода страници в активное состояние
  mainMapPin.addEventListener('mousedown', function () {
    makeActivePage();
  });
  mainMapPin.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, makeActivePage);
  });
})();
