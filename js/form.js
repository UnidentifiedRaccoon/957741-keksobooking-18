'use strict';

(function () {
  var adForm = document.querySelector('.ad-form');
  var adFormButtonReset = adForm.querySelector('.ad-form__reset');
  // Необходимо для определения, когда прятать пины(костылик)
  var pinHidden;
  var announcements = [];

  // Обновление объявления согласно фильтрам
  var update = function () {
    window.renderAnnouncement(announcements.slice()
    .filter(window.filterFunctions.filterType)
    .filter(window.filterFunctions.filterPrice)
    .filter(window.filterFunctions.filterRooms)
    .filter(window.filterFunctions.filterGuests)
    .filter(window.filterFunctions.filterFeatures), pinHidden);
  };

  window.filterSetup.filters.onTypeChange = window.debounce(function (type) {
    window.filterFunctions.selectedType = type;
    pinHidden = false;
    update();
  });

  window.filterSetup.filters.onPriceChange = window.debounce(function (price) {
    window.filterFunctions.selectedPrice = price;
    pinHidden = false;
    update();
  });

  window.filterSetup.filters.onRoomsChange = window.debounce(function (rooms) {
    window.filterFunctions.selectedRooms = rooms;
    pinHidden = false;
    update();
  });

  window.filterSetup.filters.onGuestsChange = window.debounce(function (guests) {
    window.filterFunctions.selectedGuests = guests;
    pinHidden = false;
    update();
  });

  window.filterSetup.filters.onFeaturesChange = window.debounce(function (feature) {
    window.filterFunctions.selectedFeatures.push(feature);
    window.filterFunctions.selectedFeatures = window.filterFunctions.selectedFeatures.filter(function (item, index, arr) {
      var currentDoubleIndex = arr.lastIndexOf(item);
      if (currentDoubleIndex >= 0 && index !== currentDoubleIndex) {
        window.filterFunctions.selectedFeatures.splice(currentDoubleIndex, 1);
        return false;
      }
      return true;
    });
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
    pinHidden = true;
    update();
  };

  adFormButtonReset.addEventListener('click', function (evt) {
    evt.preventDefault();
    window.nonActive.makeNonActivePage();
    pinHidden = true;
    update();
  });

  // Обработчик события отправки формы
  adForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    // Отправка данных согласно AJAX
    window.backend.save(new FormData(adForm), onSave, window.util.onErrorMessage);
  });

})();
