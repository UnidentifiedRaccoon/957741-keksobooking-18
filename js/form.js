'use strict';

(function () {
  var adForm = document.querySelector('.ad-form');
  var filterForm = document.querySelector('.map__filters');
  var mainMapPin = document.querySelector('.map__pin--main');
  var inputAddress = adForm.querySelector('#address');
  var selectRoomNumbers = document.querySelector('#room_number');
  var selectCapacity = document.querySelector('#capacity');
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
    window.util.map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    removeChildrenAttribute(filterForm, 'disabled');
    removeChildrenAttribute(adForm, 'disabled');
    inputAddress.value = getPointIndicateByMainMapPin(mainMapPin.style.top, mainMapPin.style.left);
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

  // Функция для проверкии соответствия значения комнат и гостей
  var validationOfRoomsAndGuests = function () {
    var roomNumbers = selectRoomNumbers;
    var capacity = selectCapacity;
    if (roomNumbers.value === '100' || capacity.value === '0') {
      if (roomNumbers.value === '100' && capacity.value === '0') {
        capacity.setCustomValidity('');
      } else {
        capacity.setCustomValidity('100 комнат - помещение не для гостей');
      }
    } else if (roomNumbers.value < capacity.value) {
      capacity.setCustomValidity('Слишком много гостей');
    } else {
      capacity.setCustomValidity('');
    }
  };

  // Вызов функции для валидации изначальных значений
  validationOfRoomsAndGuests();

  // Обработчики изменения значениий select'а комнат и гостей
  selectRoomNumbers.addEventListener('change', function () {
    validationOfRoomsAndGuests();
  });
  selectCapacity.addEventListener('change', function () {
    validationOfRoomsAndGuests();
  });

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
