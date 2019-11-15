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
    return (window.filterFunctions.selectedType === 'any' ||
     window.filterFunctions.selectedType === item.offer.type);
  };

  // Функция фильтрации объявлении по цене
  var filterPrice = function (item) {
    // Любая цена
    if (window.filterFunctions.selectedPrice === 'any') {
      return true;
    // Низкая цена
    } else if (window.filterFunctions.selectedPrice === 'low') {
      return (item.offer.price <= 10000);
    // Средняя цена
    } else if (window.filterFunctions.selectedPrice === 'middle') {
      return (item.offer.price > 10000 && item.offer.price < 50000);
    // Высокая цена
    } else if (window.filterFunctions.selectedPrice === 'high') {
      return (item.offer.price >= 50000);
    }
    return false;
  };

  // Функция фильтрации объявлении по количеству комнат
  var filterRooms = function (item) {
    return (window.filterFunctions.selectedRooms === 'any' ||
     parseInt(window.filterFunctions.selectedRooms, 10) === item.offer.rooms);
  };

  // Функция фильтрации объявлении по количеству гостей
  var filterGuests = function (item) {
    return ((window.filterFunctions.selectedGuests === 'any' ||
      parseInt(window.filterFunctions.selectedGuests, 10) === item.offer.guests) &&
      parseInt(window.filterFunctions.selectedGuests, 10) !== 0);
  };

  // Функция фильтрации объявлении по доп. услугам
  var filterFeatures = function (item) {
    return window.filterFunctions.selectedFeatures.every(function (it) {
      return item.offer.features && item.offer.features.indexOf(it) !== -1;
    });
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
