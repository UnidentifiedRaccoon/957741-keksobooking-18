'use strict';

(function () {
  var filterForm = document.querySelector('.map__filters');
  var typeSelect = filterForm.querySelector('#housing-type');
  var priceSelect = filterForm.querySelector('#housing-price');
  var roomsSelect = filterForm.querySelector('#housing-rooms');
  var guestsSelect = filterForm.querySelector('#housing-guests');
  var filters = {
    onTypeChange: function () {},
    onPriceChange: function () {},
    onRoomsChange: function () {},
    onGuestsChange: function () {},
  };

  typeSelect.addEventListener('change', function () {
    filters.onTypeChange(typeSelect.value);
  });

  priceSelect.addEventListener('change', function () {
    filters.onPriceChange(priceSelect.value);
  });

  roomsSelect.addEventListener('change', function () {
    filters.onRoomsChange(roomsSelect.value);
  });

  guestsSelect.addEventListener('change', function () {
    filters.onGuestsChange(guestsSelect.value);
  });

  window.filterSetup = {
    filters: filters,
  };
})();
