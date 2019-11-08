'use strict';

(function () {
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
  var makeActivePage = function () {
    // Удаление неактивной CSS стилизиции
    window.util.map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    // Удаление атрибутов disabled у всех элементов форм
    removeChildrenAttribute(filterForm, 'disabled');
    removeChildrenAttribute(adForm, 'disabled');
    // Заполнение поля адрес координатами главного пина
    inputAddress.value = window.mainPin.getMainMapPinCoords();
    // JS валидация формы
    window.validation.allValidation();
    // Вставка фрагмента с пинами на страницу
    // mapPinsListElement.appendChild(window.renderAnnouncement.pinsFragment);
    // window.util.map.insertBefore(window.renderAnnouncement.cardsFragment, pinsCarsListElement);
    // Удаление у всех пинов класса hidden
    var mapPins = mapPinsListElement.querySelectorAll('.map__pin');
    for (var x = 0; x < mapPins.length; x++) {
      if (!mapPins[x].classList.contains('map__pin--main')) {
        mapPins[x].classList.remove('hidden');
      }
    }
  };

  // Запись изначальных координат в поле адреса
  inputAddress.value = window.mainPin.getMainMapPinCoords();

  // Обработчики клика и ENTER'a для перевода страници в активное состояние
  mainMapPin.addEventListener('mousedown', function () {
    makeActivePage();
  });
  mainMapPin.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, makeActivePage);
  });
})();
