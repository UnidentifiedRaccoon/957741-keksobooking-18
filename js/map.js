'use strict';

(function () {
  var ENTER_KEYCODE = 13;
  var ESC_KEYCODE = 27;

  var showCard = function (card) {
    card.classList.toggle('visually-hidden');
  };
  var closeCard = function (card) {
    card.classList.add('visually-hidden');
  };

  var addListeners = function (pin, card) {
    var currenClose = card.querySelector('.popup__close');
    pin.addEventListener('mousedown', function () {
      showCard(card);
    });
    pin.addEventListener('keydown', function (evt) {
      if (evt.keyCode === ENTER_KEYCODE) {
        showCard(card);
      }
    });
    window.addEventListener('keydown', function (evt) {
      if (evt.keyCode === ESC_KEYCODE) {
        closeCard(card);
      }
    });
    currenClose.addEventListener('click', function () {
      closeCard(card);
    });
  };

  // Наполнение fragment`а DOM - элементами обьявлений
  var pinsFragment = document.createDocumentFragment();
  var cardsFragment = document.createDocumentFragment();
  for (var i = 0; i < window.data.announcements.length; i++) {
    (function () {
      var currentPin = window.pin.renderMapPin(window.data.announcements[i]);
      var currentCard = window.card.renderPinCard(window.data.announcements[i]);
      // Привязка карточки к пину
      addListeners(currentPin, currentCard); // Без space
      // Наполнение fragment`а
      pinsFragment.appendChild(currentPin);
      cardsFragment.appendChild(currentCard);
    })();
  }

  window.map = {
    pinsFragment: pinsFragment,
    cardsFragment: cardsFragment
  };
})();
