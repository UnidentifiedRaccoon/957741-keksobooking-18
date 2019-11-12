'use strict';

(function () {
  var ENTER_KEYCODE = 13;
  var adForm = document.querySelector('.ad-form');
  var filterForm = document.querySelector('.map__filters');
  var mainMapPin = document.querySelector('.map__pin--main');
  var inputAddress = adForm.querySelector('#address');
  var mapPinsListElement = window.util.map.querySelector('.map__pins');

  // Функция для удаления указанного атрибута во всех элементах(детях) указаннного родителя
  var removeChildrenAttribute = function (parent, attr) {
    var children = parent.children;
    for (var j = 0; j < children.length; j++) {
      children[j].removeAttribute(attr);
    }
  };

  // Функция для перевода страницы в активное сосотояние
  var makeActivePage = function (evt) {
    if (evt.type === 'mousedown' || evt.keyCode === ENTER_KEYCODE) {
      // Удаление неактивной CSS стилизиции
      window.util.map.classList.remove('map--faded');
      adForm.classList.remove('ad-form--disabled');
      // Удаление атрибутов disabled у всех элементов форм
      removeChildrenAttribute(filterForm, 'disabled');
      removeChildrenAttribute(adForm, 'disabled');
      // Заполнение поля адрес координатами главного пина
      inputAddress.value = window.mainPin.getMainMapPinCoords();
      // Удаление у всех пинов класса hidden
      var mapPins = mapPinsListElement.querySelectorAll('.map__pin');
      for (var x = 0; x < mapPins.length; x++) {
        mapPins[x].classList.remove('hidden');
      }
      window.validation.allValidation();
      // Удаление обработчиков по окончании выполнения функции
      this.removeEventListener('mousedown', makeActivePage);
      this.removeEventListener('keydown', makeActivePage);
    }
  };

  // Запись изначальных координат в поле адреса
  inputAddress.value = window.mainPin.getMainMapPinCoords();

  // Обработчики клика и ENTER'a для перевода страници в активное состояние
  mainMapPin.addEventListener('mousedown', makeActivePage.bind(mainMapPin));
  mainMapPin.addEventListener('keydown', makeActivePage.bind(mainMapPin));

  window.active = {
    makeActivePage: makeActivePage,
  };
})();
