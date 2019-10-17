'use strict';

(function () {
  var mapPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var LOCATION_X_OFFSET = 25;
  var LOCATION_Y_OFFSET = 70;

  // Создание DOM элемента обьявления на основе данных обьекта pin
  var renderMapPin = function (pin) {
    var mapPin = mapPinTemplate.cloneNode(true);
    var mapPinImg = mapPin.querySelector('img');
    mapPinImg.alt = pin.offer.title;
    mapPinImg.src = pin.author.avatar;
    mapPin.style.left = (pin.location.x - LOCATION_X_OFFSET) + 'px';
    mapPin.style.top = (pin.location.y - LOCATION_Y_OFFSET) + 'px';
    return mapPin;
  };

  // экспорт данных модуля
  window.pin = {
    renderMapPin: renderMapPin
  };
})();
