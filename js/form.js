'use strict';

(function () {
  var adForm = document.querySelector('.ad-form');
  var filterForm = document.querySelector('.map__filters');
  var mainMapPin = document.querySelector('.map__pin--main');
  var inputAddress = adForm.querySelector('#address');
  var selectRoomNumbers = adForm.querySelector('#room_number');
  var selectCapacity = adForm.querySelector('#capacity');
  var selectType = adForm.querySelector('#type');
  var inputPrice = adForm.querySelector('#price');
  var selectTimein = adForm.querySelector('#timein');
  var selectTimeout = adForm.querySelector('#timeout');
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
    inputAddress.value = getPointIndicateByMainMapPin(mainMapPin.style.top, mainMapPin.style.left);

    // Подобный кейс бует использоваться и в других случаях так что это стоит вынести в функцию
    // Вызов функции для валидации изначальных значений select'а комнат и гостей
    validationOfRoomsAndGuests();
    // Обработчики изменения значениий select'а комнат и гостей
    selectRoomNumbers.addEventListener('change', function () {
      validationOfRoomsAndGuests();
    });
    selectCapacity.addEventListener('change', function () {
      validationOfRoomsAndGuests();
    });
    // -----------------------------------------------------
    // Вызов функции для валидации изначальных значений цены и типа
    validationOfPriceAndType();
    // Обработчики изменения значений цены и типа
    selectType.addEventListener('change', function () {
      validationOfPriceAndType();
    });
    inputPrice.addEventListener('change', function () {
      validationOfPriceAndType();
    });
    // -----------------------------------------------------
    // Вызов функции для валидации изначальных значений цены и типа
    validationOfTimeinAndTimeout(selectTimein, selectTimeout);
    // Обработчики изменения значений цены и типа
    selectTimein.addEventListener('change', function () {
      validationOfTimeinAndTimeout(selectTimein, selectTimeout);
    });
    selectTimeout.addEventListener('change', function () {
      validationOfTimeinAndTimeout(selectTimeout, selectTimein);
    });
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

  // Функция для проверкии соответствия значений комнат и гостей
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

  // Функция для проверкии соответствия значений цены и типа
  var validationOfPriceAndType = function () {
    var type = selectType;
    var price = inputPrice;
    switch (type.value) {
      case 'bungalo':
        price.min = 0;
        break;
      case 'flat':
        price.min = 1000;
        break;
      case 'house':
        price.min = 5000;
        break;
      case 'palace':
        price.min = 10000;
        break;
      default:
        price.setCustomValidity('Возникла непредвиденная ошибка');
    }
  };

  // Функция для проверкии соответствия значений select'а времени заезда и выезда
  var validationOfTimeinAndTimeout = function (changed, unchanged) {
    switch (changed.value) {
      case '12:00':
        unchanged.value = '12:00';
        break;
      case '13:00':
        unchanged.value = '13:00';
        break;
      case '14:00':
        unchanged.value = '14:00';
        break;
      default:
        unchanged.setCustomValidity('Возникла непредвиденная ошибка');
    }
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
