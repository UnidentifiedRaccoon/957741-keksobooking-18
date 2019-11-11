'use strict';

(function () {
  var filterForm = document.querySelector('.map__filters');
  var typeSelect = filterForm.querySelector('#housing-type');
  var priceSelect = filterForm.querySelector('#housing-price');
  var roomsSelect = filterForm.querySelector('#housing-rooms');
  var guestsSelect = filterForm.querySelector('#housing-guests');
  var featureCheckboxes = filterForm.querySelectorAll('.map__checkbox');
  var filters = {
    onTypeChange: function () {},
    onPriceChange: function () {},
    onRoomsChange: function () {},
    onGuestsChange: function () {},
    onFeaturesChange: function () {},
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

  for (var i = 0; i < featureCheckboxes.length; i++) {
    featureCheckboxes[i].addEventListener('change', function () {
      filters.onFeaturesChange(this.value);
    });
  }

  window.filterSetup = {
    filters: filters,
  };
})();
