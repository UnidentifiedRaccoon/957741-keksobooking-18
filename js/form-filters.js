'use strict';

(function () {
  var filterForm = document.querySelector('.map__filters');
  var adForm = document.querySelector('.ad-form');
  var adFormButtonReset = adForm.querySelector('.ad-form__reset');
  // Необходимо для определения, когда прятать пины(костылик)
  var pinHidden;
  var announcements = [];
  var typeSelect = filterForm.querySelector('#housing-type');
  var selectedType = typeSelect.value;

  var priceSelect = filterForm.querySelector('#housing-price');
  var selectedPrice = priceSelect.value;

  var roomsSelect = filterForm.querySelector('#housing-rooms');
  var selectedRooms = roomsSelect.value;

  var guestsSelect = filterForm.querySelector('#housing-guests');
  var selectedGuests = guestsSelect.value;

  // Функция фильтрации типа
  var filterType = function (item) {
    if (selectedType === 'any') {
      return true;
    } else if (selectedType === item.offer.type) {
      return true;
    } else {
      return false;
    }
  };

  var filterPrice = function (item) {
    // Любая цена
    if (selectedPrice === 'any') {
      return true;
    // Низкая цена
    } else if (selectedPrice === 'low') {

      if (item.offer.price <= 10000) {
        return true;
      }
      return false;
    // Средняя цена
    } else if (selectedPrice === 'middle') {

      if (item.offer.price > 10000 && item.offer.price < 50000) {
        return true;
      }
      return false;
    // Высокая цена
    } else if (selectedPrice === 'high') {

      if (item.offer.price >= 50000) {
        return true;
      }
      return false;
    }
    return false;
  };

  var filterRooms = function (item) {
    if (selectedRooms === 'any') {
      return true;
    } else if (parseInt(selectedRooms, 10) === item.offer.rooms) {
      return true;
    } else {
      return false;
    }
  };

  var filterGuests = function (item) {
    if (selectedGuests === 'any') {
      return true;
    } else if (parseInt(selectedGuests, 10) === 0) {
      return false;
    } else if (parseInt(selectedGuests, 10) === item.offer.guests) {
      return true;
    } else {
      return false;
    }
  };

  // Обновление объявления согласно фильтрам
  var update = function () {
    window.renderAnnouncement(announcements.slice()
    .filter(filterType)
    .filter(filterPrice)
    .filter(filterRooms)
    .filter(filterGuests)
    , pinHidden);
  };

  window.filterSetup.filters.onTypeChange = window.debounce(function (type) {
    selectedType = type;
    pinHidden = false;
    update();
  });

  window.filterSetup.filters.onPriceChange = window.debounce(function (price) {
    selectedPrice = price;
    pinHidden = false;
    update();
  });

  window.filterSetup.filters.onRoomsChange = window.debounce(function (rooms) {
    selectedRooms = rooms;
    pinHidden = false;
    update();
  });

  window.filterSetup.filters.onGuestsChange = window.debounce(function (guests) {
    selectedGuests = guests;
    pinHidden = false;
    update();
  });


  // Функция для обработки успешного получения данных
  var onLoad = function (data) {
    announcements = data;
    pinHidden = true;
    update();
  };

  window.backend.load(onLoad, window.util.onErrorMessage);

  // Функция для обработки успешной отправки данных
  var onSave = function () {
    window.nonActive.makeNonActivePage();
    window.util.onSuccessMessage();
    selectedType = typeSelect.value;
    selectedPrice = priceSelect.value;
    selectedRooms = roomsSelect.value;
    selectedGuests = guestsSelect.value;
    pinHidden = true;
    update();
  };


  // adFormButtonSubmit.addEventListener('mousedown', function () {
  //   // JS валидация формы
  //   window.validation.allValidation();
  // });

  adFormButtonReset.addEventListener('click', function (evt) {
    evt.preventDefault();
    window.nonActive.makeNonActivePage();
  });

  // Обработчик события отправки формы
  adForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    // Отправка данных согласно AJAX
    window.backend.save(new FormData(adForm), onSave, window.util.onErrorMessage);
  });

})();
