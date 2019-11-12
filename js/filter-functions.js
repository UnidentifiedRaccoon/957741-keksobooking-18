'use strict';

(function () {
  var filterForm = document.querySelector('.map__filters');
  var typeSelect = filterForm.querySelector('#housing-type');
  var priceSelect = filterForm.querySelector('#housing-price');
  var roomsSelect = filterForm.querySelector('#housing-rooms');
  var guestsSelect = filterForm.querySelector('#housing-guests');
  var selectedType = typeSelect.value;
  var selectedPrice = priceSelect.value;
  var selectedRooms = roomsSelect.value;
  var selectedGuests = guestsSelect.value;
  var selectedFeatures = [];
  // Функция фильтрации объявлении по типу
  var filterType = function (item) {
    if (window.filterFunctions.selectedType === 'any') {
      return true;
    } else if (window.filterFunctions.selectedType === item.offer.type) {
      return true;
    } else {
      return false;
    }
  };

  // Функция фильтрации объявлении по цене
  var filterPrice = function (item) {
    // Любая цена
    if (window.filterFunctions.selectedPrice === 'any') {
      return true;
    // Низкая цена
    } else if (window.filterFunctions.selectedPrice === 'low') {

      if (item.offer.price <= 10000) {
        return true;
      }
      return false;
    // Средняя цена
    } else if (window.filterFunctions.selectedPrice === 'middle') {

      if (item.offer.price > 10000 && item.offer.price < 50000) {
        return true;
      }
      return false;
    // Высокая цена
    } else if (window.filterFunctions.selectedPrice === 'high') {

      if (item.offer.price >= 50000) {
        return true;
      }
      return false;
    }
    return false;
  };

  // Функция фильтрации объявлении по количеству комнат
  var filterRooms = function (item) {
    if (window.filterFunctions.selectedRooms === 'any') {
      return true;
    } else if (parseInt(window.filterFunctions.selectedRooms, 10) === item.offer.rooms) {
      return true;
    } else {
      return false;
    }
  };

  // Функция фильтрации объявлении по количеству гостей
  var filterGuests = function (item) {
    if (window.filterFunctions.selectedGuests === 'any') {
      return true;
    } else if (parseInt(window.filterFunctions.selectedGuests, 10) === 0) {
      return false;
    } else if (parseInt(window.filterFunctions.selectedGuests, 10) === item.offer.guests) {
      return true;
    } else {
      return false;
    }
  };

  // Функция фильтрации объявлении по доп. услугам
  var filterFeatures = function (item) {

    if (selectedFeatures.length === 0) {
      return true;
    }
    var features = item.offer.features.join(', ');
    for (var i = 0; i < window.filterFunctions.selectedFeatures.length; i++) {
      if (features.indexOf(window.filterFunctions.selectedFeatures[i]) === -1) {
        return false;
      }
    }
    return true;
  };

  window.filterFunctions = {
    filterType: filterType,
    filterPrice: filterPrice,
    filterRooms: filterRooms,
    filterGuests: filterGuests,
    filterFeatures: filterFeatures,
    selectedType: selectedType,
    selectedPrice: selectedPrice,
    selectedRooms: selectedRooms,
    selectedGuests: selectedGuests,
    selectedFeatures: selectedFeatures,
  };
})();
