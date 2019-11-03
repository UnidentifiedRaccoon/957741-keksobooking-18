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
    var children = parent.children;
    for (var j = 0; j < children.length; j++) {
      children[j].removeAttribute(attr);
    }
  };

  // Функция для добавления указанного атрибута во всех элементах(детях) указаннного родителя
  var addChildrenAttribute = function (parent, attr) {
    var children = parent.children;
    for (var j = 0; j < children.length; j++) {
      children[j].setAttribute(attr, true);
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
    mapPinsListElement.appendChild(window.map.pinsFragment);
    // Удаление у всех пинов класса hidden
    var mapPins = mapPinsListElement.querySelectorAll('.map__pin');
    for (var x = 0; x < mapPins.length; x++) {
      if (!mapPins[x].classList.contains('map__pin--main')) {
        mapPins[x].classList.remove('hidden');
      }
    }
    // Вставка фрагмента с карточками на страницу
    window.util.map.insertBefore(window.map.cardsFragment, pinsCarsListElement);
  };

  // Функция для перевода страницы в НЕактивное сосотояние
  var makeNonActivePage = function () {
    // Сброс полей форм сортировки и подачи объявления
    adForm.reset();
    filterForm.reset();
    // Добавление всем дочерним элементам форм атрибута disabled
    addChildrenAttribute(filterForm, 'disabled');
    addChildrenAttribute(adForm, 'disabled');
    // Добавление неактивной CSS стилизиции
    window.util.map.classList.add('map--faded');
    adForm.classList.add('ad-form--disabled');
    // Заполнение поля адрес координатами главного пина
    inputAddress.value = window.mainPin.getMainMapPinCoords();
    // Добавление всем пинам класса hidden и фокусировка на главном пине(поднимает страницу на верх)
    var mapPins = mapPinsListElement.querySelectorAll('.map__pin');
    for (var x = 0; x < mapPins.length; x++) {
      if (mapPins[x].classList.contains('map__pin--main')) {
        mapPins[x].focus();
      } else {
        mapPins[x].classList.remove('map__pin--active');
        mapPins[x].classList.add('hidden');
      }
    }
    // Добавление всем карточкам класса hidden (для скрытия акнивных/открытых карточек)
    var mapCards = window.util.map.querySelectorAll('.map__card');
    for (var z = 0; z < mapCards.length; z++) {
      mapCards[z].classList.add('hidden');
    }
  };

  // Функция для обработки успешной тправки данных
  var onLoad = function () {
    makeNonActivePage();
    window.util.onSuccessMessage();
  };

  // Обработчик события отправки формы
  adForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    // Отпраыка данных согласно AJAX
    window.backend.save(new FormData(adForm), onLoad, window.util.onErrorMessage);
  });

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
