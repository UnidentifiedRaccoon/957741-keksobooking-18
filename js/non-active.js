'use strict';

(function () {
  var adForm = document.querySelector('.ad-form');
  var filterForm = document.querySelector('.map__filters');
  var inputAddress = adForm.querySelector('#address');
  var mapPinsListElement = window.util.map.querySelector('.map__pins');

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

  window.nonActive = {
    makeNonActivePage: makeNonActivePage,
  };
})();
