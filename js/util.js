'use strict';
(function () {
  var ENTER_KEYCODE = 13;
  var isEnterEvent = function (evt, action) {
    if (evt.keyCode === ENTER_KEYCODE) {
      action();
    }
  };
  window.util = {
    isEnterEvent: isEnterEvent,
    map: document.querySelector('.map'),
  };
})();
