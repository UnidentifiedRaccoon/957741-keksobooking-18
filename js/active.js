'use strict';

(function () {
  var adForm = document.querySelector('.ad-form');
  var filterForm = document.querySelector('.map__filters');
  var mainMapPin = document.querySelector('.map__pin--main');
  var inputAddress = adForm.querySelector('#address');
  var mapPinsListElement = window.util.map.querySelector('.map__pins');
  var pinsCarsListElement = document.querySelector('.map__filters-container');

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
    inputAddress.value = window.mainPin.getMainMapPinCoords();
    // JS валидация формы
    window.validation.allValidation();
    // Вставка фрагментов с пинами и карточками на страницу
    mapPinsListElement.appendChild(window.map.pinsFragment);
    window.util.map.insertBefore(window.map.cardsFragment, pinsCarsListElement);
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
