'use strict';

(function () {
  var adForm = document.querySelector('.ad-form');
  var selectRoomNumbers = adForm.querySelector('#room_number');
  var selectCapacity = adForm.querySelector('#capacity');
  var selectType = adForm.querySelector('#type');
  var inputPrice = adForm.querySelector('#price');
  var selectTimein = adForm.querySelector('#timein');
  var selectTimeout = adForm.querySelector('#timeout');
  var inputTitle = adForm.querySelector('#title');

  // Функция для проверкии соответствия значений комнат и гостей
  var validationOfRoomsAndGuests = function () {
    var roomNumbers = selectRoomNumbers;
    var capacity = selectCapacity;
    var roomVal = parseInt(roomNumbers.value, 10);
    var capVal = parseInt(capacity.value, 10);
    switch (roomNumbers.value) {
      case '1':
      case '2':
      case '3':
        if (capVal <= roomVal && capVal ==! 0) {
          capacity.setCustomValidity('');
          capacity.classList.remove('invalid');
        } else {
          capacity.setCustomValidity('Максимальное количество гостей ' + roomVal + '. Укажите конкретное число гостей или измените количество комнат');
          capacity.classList.add('invalid');
        }
        break;
      case '100':
        if (capVal === 0) {
          capacity.setCustomValidity('');
          capacity.classList.remove('invalid');
        } else {
          capacity.setCustomValidity('Такое помещение точно не для гостей');
          capacity.classList.add('invalid');
        }
        break;
      default:
        capacity.setCustomValidity('Возникла непредвиденная ошибка');
        capacity.classList.add('invalid');
    }
  };

  // Функция для проверкии соответствия значений цены и типа
  var validationOfPriceAndType = function () {
    var type = selectType;
    var price = inputPrice;
    switch (type.value) {
      case 'bungalo':
        price.min = 0;
        price.placeholder = 0;
        break;
      case 'flat':
        price.min = 1000;
        price.placeholder = 1000;
        break;
      case 'house':
        price.min = 5000;
        price.placeholder = 5000;
        break;
      case 'palace':
        price.min = 10000;
        price.placeholder = 10000;
        break;
      default:
        price.setCustomValidity('Возникла непредвиденная ошибка');
        price.classList.add('invalid');
    }

    if (parseInt(price.value, 10) >= price.min && parseInt(price.value, 10) <= price.max) {
      price.setCustomValidity('');
      price.classList.remove('invalid');
    } else if (parseInt(price.value, 10) < price.min) {
      price.setCustomValidity('Цена слишком низкая для данного типа жилья. Цена должна быть не ниже' + price.min);
      price.classList.add('invalid');
    } else if (parseInt(price.value, 10) > price.max) {
      price.setCustomValidity('Цена слишком высокая жилья. Максимальная возможная цена ' + price.max);
      price.classList.add('invalid');
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

  // Функция проверки корректности данных введенных в поле Заголовка
  var validationOfTitle = function () {
    var title = inputTitle;
    if (title.validity.tooLong) {
      title.setCustomValidity('Заголовок слишком длинный');
      title.classList.add('invalid');
    } else if (title.validity.tooShort) {
      title.setCustomValidity('Заголовок слишком короткий');
      title.classList.add('invalid');
    } else {
      title.setCustomValidity('');
      title.classList.remove('invalid');
    }
  };

  // Функция для вызова для валидации значений select'а комнат и гостей
  var callRoomsAndGuestsValidation = function () {
    // Валидация начальных значений
    validationOfRoomsAndGuests();
    // Обработчики изменения значениий
    selectRoomNumbers.addEventListener('change', validationOfRoomsAndGuests);
    selectCapacity.addEventListener('change', validationOfRoomsAndGuests);
  };

  // Функция для вызова валидации значений цены и типа
  var callPriceAndTypeValidation = function () {
    // Валидация начальных значений
    validationOfPriceAndType();
    // Обработчик изменения значений цены и типа
    selectType.addEventListener('change', validationOfPriceAndType);
    inputPrice.addEventListener('input', validationOfPriceAndType);
  };

  // Функция для вызова валидации select'а времени заезда и выезда
  var callTimeinAndTimeoutValidation = function () {
    // Валидация начальных значений
    validationOfTimeinAndTimeout(selectTimein, selectTimeout);
    // Обработчики изменения значений
    selectTimein.addEventListener('change', validationOfTimeinAndTimeout.bind(null, selectTimein, selectTimeout));
    selectTimeout.addEventListener('change', validationOfTimeinAndTimeout.bind(null, selectTimeout, selectTimein));
  };

  var callTitleValidation = function () {
    // Валидация начальных значений
    validationOfTitle();
    // Обработчики изменения значений
    inputTitle.addEventListener('input', validationOfTitle);
  };

  // Функция для общего вызова валидации
  var validation = function () {
    callRoomsAndGuestsValidation();
    callPriceAndTypeValidation();
    callTimeinAndTimeoutValidation();
    callTitleValidation();
  };

  window.validation = {
    allValidation: validation
  };
})();
