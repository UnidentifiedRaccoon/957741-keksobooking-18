'use strict';

(function () {
  var adForm = document.querySelector('.ad-form');
  var inputAddress = adForm.querySelector('#address');
  var mainMapPin = document.querySelector('.map__pin--main');
  var MAIN_LOCATION_Y_OFFSET = mainMapPin.offsetHeight;
  var MAIN_LOCATION_X_OFFSET = mainMapPin.offsetWidth;

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
      var leftCoordMax = window.data.mapWidth - MAIN_LOCATION_X_OFFSET;
      var leftCoordMin = 0;
      if (leftCoord > leftCoordMin && leftCoord < leftCoordMax) {
        // В заданных пределах можно двигать свободно
        mainMapPin.style.left = (mainMapPin.offsetLeft + shift.x) + 'px';
      } else if (shift.x > 0 && leftCoord <= leftCoordMin) {
        // Если меньше минимума, то можно только увеличить
        mainMapPin.style.left = (mainMapPin.offsetLeft + shift.x) + 'px';
      } else if (shift.x < 0 && leftCoord >= leftCoordMax) {
        // Если больше максимума, то можно только уменьшить
        mainMapPin.style.left = (mainMapPin.offsetLeft + shift.x) + 'px';
      }

      var topCoord = parseInt(mainMapPin.style.top, 10);
      var topCoordMax = window.data.locationYMax;
      var topCoordMin = window.data.locationYMin;
      if (topCoord > topCoordMin && topCoord < topCoordMax) {
        // В заданных пределах можно двигать свободно
        mainMapPin.style.top = (mainMapPin.offsetTop + shift.y) + 'px';
      } else if (shift.y > 0 && topCoord <= topCoordMin) {
        // Если меньше минимума, то можно только увеличить
        mainMapPin.style.top = (mainMapPin.offsetTop + shift.y) + 'px';
      } else if (shift.y < 0 && topCoord >= topCoordMax) {
        // Если больше максимума, то можно только уменьшить
        mainMapPin.style.top = (mainMapPin.offsetTop + shift.y) + 'px';
      }
      // var limitMainPinMove = function(direction) {
      //   var coordCSS;
      //   var coord;
      //   var coordMax;
      //   var coordMin;
      //   var offset;
      //   var shift;
      //
      //   if (direction === 'vertical') {
      //     coordCSS = mainMapPin.style.top;
      //     coord = parseInt(coordCSS, 10);
      //     coordMax = window.data.locationYMax;
      //     coordMin = window.data.locationYMin;
      //     offset = mainMapPin.offsetTop;
      //     shift = shift.y;
      //   } else if (direction === 'horizontal') {
      //     coordCSS = mainMapPin.style.left;
      //     coord = parseInt(coordCSS, 10);
      //     coordMax = window.data.mapWidth - MAIN_LOCATION_X_OFFSET;
      //     coordMin = 0;
      //     offset = mainMapPin.offsetLeft;
      //     shift = shift.x;
      //   }
      //
      //   if (coord > coordMin && coord < coordMax) {
      //     // В заданных пределах можно двигать свободно
      //     coordCSS = (offset + shift) + 'px';
      //   } else if (shift > 0 && leftCoord <= leftCoordMin) {
      //     // Если меньше минимума, то можно только увеличить
      //     coordCSS = (offset + shift) + 'px';
      //   } else if (shift < 0 && leftCoord >= leftCoordMax) {
      //     // Если больше максимума, то можно только уменьшить
      //     coordCSS = (offset + shift) + 'px';
      //   }
      // };

      // var limitMainPinMove = function(coord, coordMax, coordMin, offset, shift) {
      //   // console.log('Почему не работаешь?');
      //   var currentCoord = '';
      //   console.log(coord, coordMax, coordMin, offset, shift);
      //   console.log(coord > coordMin && coord < coordMax);
      //   console.log(shift > 0 && coord <= coordMin);
      //   console.log(shift < 0 && coord >= coordMax);
      //   if (coord > coordMin && coord < coordMax) {
      //     // В заданных пределах можно двигать свободно
      //     currentCoord = (offset + shift) + 'px';
      //   } else if (shift > 0 && coord <= coordMin) {
      //     // Если меньше минимума, то можно только увеличить
      //     currentCoord = (offset + shift) + 'px';
      //   } else if (shift < 0 && coord >= coordMax) {
      //     // Если больше максимума, то можно только уменьшить
      //     currentCoord = (offset + shift) + 'px';
      //   }
      //   return currentCoord
      // };
      // mainMapPin.style.top = limitMainPinMove(parseInt(mainMapPin.style.top, 10), window.data.locationYMax, window.data.locationYMin, mainMapPin.offsetTop, shift.y);
      // mainMapPin.style.left = limitMainPinMove(parseInt(mainMapPin.style.left, 10), window.data.mapWidth - MAIN_LOCATION_X_OFFSET, 0, mainMapPin.offsetLeft, shift.x);

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
