'use strict';

(function () {
  var filterForm = document.querySelector('.map__filters');
  var adForm = document.querySelector('.ad-form');
  // Необходимо для определения, когда прятать пины(костылик)
  var pinHidden;
  var announcements = [];

  // Функция фильтрации типа
  var filterType = function (item) {
    if (selectedType === 'any') {
      return true;
    } else if (item.offer.type === selectedType) {
      return true;
    } else {
      return false;
    }
  };

  // Обновление объявления согласно фильтрам
  var update = function () {
    window.renderAnnouncement(announcements.slice().filter(filterType), pinHidden);
  };

  // Отслеживание изменений селекта типа
  var typeSelect = filterForm.querySelector('#housing-type');
  var selectedType = typeSelect.value;
  typeSelect.addEventListener('change', function () {
    selectedType = typeSelect.value;
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
    pinHidden = true;
    update();
  };

  // Обработчик события отправки формы
  adForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    // Отправка данных согласно AJAX
    window.backend.save(new FormData(adForm), onSave, window.util.onErrorMessage);
  });

})();
