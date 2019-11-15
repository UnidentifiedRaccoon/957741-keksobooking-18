'use strict';

(function () {
  var adForm = document.querySelector('.ad-form');
  var filterForm = document.querySelector('.map__filters');
  var inputAddress = adForm.querySelector('#address');
  var mapPinsListElement = window.util.map.querySelector('.map__pins');
  var mainMapPin = document.querySelector('.map__pin--main');
  var typeSelect = filterForm.querySelector('#housing-type');
  var priceSelect = filterForm.querySelector('#housing-price');
  var roomsSelect = filterForm.querySelector('#housing-rooms');
  var guestsSelect = filterForm.querySelector('#housing-guests');

  // Функция для добавления указанного атрибута во всех элементах(детях) указаннного родителя
  var addChildrenAttribute = function (parent, attr) {
    var children = parent.children;
    for (var j = 0; j < children.length; j++) {
      children[j].setAttribute(attr, true);
    }
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
    // Передвижение пина на начальную позицию
    window.mainPin.removeMainPinToStart();
    // Заполнение поля адрес координатами главного пина
    inputAddress.value = window.mainPin.getMainMapPinCoords();
    // Сброс фото сохраненных ф форме
    window.formPhoto.reset();
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
    // Переопределение переменных содержащих информацию о текущем состоянии лначений полей формы фильтрации
    window.filterFunctions.selectedType = typeSelect.value;
    window.filterFunctions.selectedPrice = priceSelect.value;
    window.filterFunctions.selectedRooms = roomsSelect.value;
    window.filterFunctions.selectedGuests = guestsSelect.value;
    window.filterFunctions.selectedFeatures = [];
    // Добавление обработчиков активирующих страницу
    mainMapPin.addEventListener('mousedown', window.active.onMainPinClick);
    mainMapPin.addEventListener('keydown', window.active.onMainPinClick);

  };

  window.nonActive = {
    makeNonActivePage: makeNonActivePage,
  };
})();
