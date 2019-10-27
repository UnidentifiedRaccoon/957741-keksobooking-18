'use strict';

(function () {
  var mapPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var LOCATION_X_OFFSET = 25;
  var LOCATION_Y_OFFSET = 70;

  // Создание DOM элемента обьявления на основе данных обьекта pin
  var renderMapPin = function (announcement) {
    var mapPin = mapPinTemplate.cloneNode(true);
    var mapPinImg = mapPin.querySelector('img');
    mapPinImg.alt = announcement.offer.title;
    mapPinImg.src = announcement.author.avatar;
    mapPin.style.left = (announcement.location.x - LOCATION_X_OFFSET) + 'px';
    mapPin.style.top = (announcement.location.y - LOCATION_Y_OFFSET) + 'px';
    // mapPin.addEventListener('keydown', function(evt) {
    //   isEnterEvent(evt, showCard);
    // })
    return mapPin;
  };

  // экспорт данных модуля
  window.pin = {
    renderMapPin: renderMapPin
  };
})();
