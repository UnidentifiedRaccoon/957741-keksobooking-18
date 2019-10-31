'use strict';

(function () {
  var adForm = document.querySelector('.ad-form');
  var inputAddress = adForm.querySelector('#address');
  var mainMapPin = document.querySelector('.map__pin--main');
  var MAIN_LOCATION_Y_OFFSET = mainMapPin.offsetHeight;
  var MAIN_LOCATION_X_OFFSET = mainMapPin.offsetWidth;
  var LEFT_COORD_MAX = window.data.mapWidth - MAIN_LOCATION_X_OFFSET / 2;
  var LEFT_COORD_MIN = 0 - MAIN_LOCATION_X_OFFSET / 2;
  var TOP_COORD_MAX = window.data.locationYMax;
  var TOP_COORD_MIN = window.data.locationYMin;

  // Подучение координат из CSS свойств элемента
  var getMainMapPinCoords = function () {
    var left = mainMapPin.style.left;
    var top = mainMapPin.style.top;
    left = parseInt(left, 10) + MAIN_LOCATION_X_OFFSET / 2;
    if (window.util.map.classList.contains('map--faded')) {
      top = parseInt(top, 10) + MAIN_LOCATION_Y_OFFSET / 2;
    } else {
      top = parseInt(top, 10) + MAIN_LOCATION_Y_OFFSET;
    }
    return Math.floor(left) + ', ' + Math.floor(top);
  };


  // Обработчик для передвижения главного пина
  mainMapPin.addEventListener('mousedown', function (downEvt) {
    downEvt.preventDefault();
    var shift = {
      x: 0,
      y: 0
    };
    var onClickPreventDefault = function (evt) {
      evt.preventDefault();
      mainMapPin.removeEventListener('click', onClickPreventDefault);
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      shift.x = moveEvt.movementX;
      shift.y = moveEvt.movementY;

      var leftCoord = parseInt(mainMapPin.style.left, 10);
      if (leftCoord > LEFT_COORD_MIN && leftCoord < LEFT_COORD_MAX ||
          shift.x > 0 && leftCoord <= LEFT_COORD_MIN ||
          shift.x < 0 && leftCoord >= LEFT_COORD_MAX) {
        // В заданных пределах можно двигать свободно
        //   // Если меньше минимума, то можно только увеличить
        //   // Если больше максимума, то можно только уменьшить
        mainMapPin.style.left = (mainMapPin.offsetLeft + shift.x) + 'px';
      }

      var topCoord = parseInt(mainMapPin.style.top, 10);
      if (topCoord > TOP_COORD_MIN && topCoord < TOP_COORD_MAX ||
          shift.y > 0 && topCoord <= TOP_COORD_MIN ||
          shift.y < 0 && topCoord >= TOP_COORD_MAX) {
        // В заданных пределах можно двигать свободно
        //   // Если меньше минимума, то можно только увеличить
        //   // Если больше максимума, то можно только уменьшить
        mainMapPin.style.top = (mainMapPin.offsetTop + shift.y) + 'px';
      }

      inputAddress.value = getMainMapPinCoords();
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      if (shift.x !== 0 || shift.y !== 0) {
        mainMapPin.addEventListener('click', onClickPreventDefault);
      }
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  window.mainPin = {
    getMainMapPinCoords: getMainMapPinCoords
  };
})();
