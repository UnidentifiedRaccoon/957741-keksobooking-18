'use strict';

(function () {
  var mainMapPin = document.querySelector('.map__pin--main');
  var MAIN_START_X_COORDS = '570px';
  var MAIN_START_Y_COORDS = '375px';
  var MAIN_PIN_HEIGHT = mainMapPin.offsetHeight;
  var MAIN_PIN_WIDTH = mainMapPin.offsetWidth;
  var LEFT_COORD_MAX = window.data.mapWidth - Math.floor(MAIN_PIN_WIDTH / 2);
  var LEFT_COORD_MIN = 0 - Math.floor(MAIN_PIN_WIDTH / 2);
  var ADDRESS_Y_MIN = 130;
  var ADDRESS_Y_MAX = 630;
  var TOP_COORD_MIN = ADDRESS_Y_MIN - MAIN_PIN_HEIGHT;
  var TOP_COORD_MAX = ADDRESS_Y_MAX - MAIN_PIN_HEIGHT;
  var adForm = document.querySelector('.ad-form');
  var inputAddress = adForm.querySelector('#address');

  // Подучение координат из CSS свойств элемента
  var getMainMapPinCoords = function () {
    var left = mainMapPin.style.left;
    var top = mainMapPin.style.top;
    left = parseInt(left, 10) + Math.floor(MAIN_PIN_WIDTH / 2);
    if (window.util.map.classList.contains('map--faded')) {
      top = parseInt(top, 10) + Math.floor(MAIN_PIN_HEIGHT / 2);
    } else {
      top = parseInt(top, 10) + MAIN_PIN_HEIGHT;
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
      } else if (leftCoord < LEFT_COORD_MIN) {
        // при попытках уменьшить выставится минимальная координата
        mainMapPin.style.left = LEFT_COORD_MIN + 'px';
      } else if (leftCoord > LEFT_COORD_MAX) {
        // при попытках увеличить выставится максимальная координата
        mainMapPin.style.left = LEFT_COORD_MAX + 'px';
      }

      var topCoord = parseInt(mainMapPin.style.top, 10);
      if (topCoord > TOP_COORD_MIN && topCoord < TOP_COORD_MAX ||
          shift.y > 0 && topCoord <= TOP_COORD_MIN ||
          shift.y < 0 && topCoord >= TOP_COORD_MAX) {
        // В заданных пределах можно двигать свободно
        //   // Если меньше(или =) минимума, то можно только увеличить
        //   // Если больше(или =) максимума, то можно только уменьшить
        mainMapPin.style.top = (mainMapPin.offsetTop + shift.y) + 'px';
      } else if (topCoord < TOP_COORD_MIN) {
        // при попытках уменьшить выставится минимальная координата
        mainMapPin.style.top = TOP_COORD_MIN + 'px';
      } else if (topCoord > TOP_COORD_MAX) {
        // при попытках увеличить выставится максимальная координата
        mainMapPin.style.top = TOP_COORD_MAX + 'px';
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

  var removeMainPinToStart = function () {
    mainMapPin.style.top = MAIN_START_Y_COORDS;
    mainMapPin.style.left = MAIN_START_X_COORDS;
  };

  window.mainPin = {
    getMainMapPinCoords: getMainMapPinCoords,
    removeMainPinToStart: removeMainPinToStart,
  };
})();
