'use strict';

(function () {
  var adForm = document.querySelector('.ad-form');
  var selectRoomNumbers = adForm.querySelector('#room_number');
  var selectCapacity = adForm.querySelector('#capacity');
  var selectType = adForm.querySelector('#type');
  var inputPrice = adForm.querySelector('#price');
  var selectTimein = adForm.querySelector('#timein');
  var selectTimeout = adForm.querySelector('#timeout');


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
  // Из-за особенности проверки пришлось разбить на две функции (можно сделать одной но )
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

  // Функция для вызова для валидации значений select'а комнат и гостей
  var callRoomsAndGuestsValidation = function () {
    // Валидация начальных значений
    validationOfRoomsAndGuests();
    // Обработчики изменения значениий
    selectRoomNumbers.addEventListener('change', function () {
      validationOfRoomsAndGuests();
    });
    selectCapacity.addEventListener('change', function () {
      validationOfRoomsAndGuests();
    });
  };

  // Функция для вызова валидации значений цены и типа
  var callPriceAndTypeValidation = function () {
    // Валидация начальных значений
    validationOfPriceAndType();
    // Обработчик изменения значений цены и типа
    selectType.addEventListener('change', function () {
      validationOfPriceAndType();
    });
  };

  // Функция для вызова валидации select'а времени заезда и выезда
  var callTimeinAndTimeoutValidation = function () {
    // Валидация начальных значений
    validationOfTimeinAndTimeout(selectTimein, selectTimeout);
    // Обработчики изменения значений
    selectTimein.addEventListener('change', function () {
      validationOfTimeinAndTimeout(selectTimein, selectTimeout);
    });
    selectTimeout.addEventListener('change', function () {
      validationOfTimeinAndTimeout(selectTimeout, selectTimein);
    });
  };

  // Функция для общего вызова валидации
  var validation = function () {
    callRoomsAndGuestsValidation();
    callPriceAndTypeValidation();
    callTimeinAndTimeoutValidation();
  };

  window.validation = {
    allValidation: validation
  };
})();
