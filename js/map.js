'use strict';

(function () {

  // Наполнение fragment`а DOM - элементами обьявлений
  var pinsFragment = document.createDocumentFragment();
  var cardFragment = document.createDocumentFragment();
  for (var i = 0; i < window.data.announcements.length; i++) {
    pinsFragment.appendChild(window.pin.renderMapPin(window.data.announcements[i]));
    cardFragment.appendChild(window.card.renderPinCard(window.data.announcements[i]));
  }
  // Вставка fragment`а на страницу(будет использоваться в следующих заданиях)
  var mapPinsListElement = window.util.map.querySelector('.map__pins');
  mapPinsListElement.appendChild(pinsFragment);
  mapPinsListElement.after(cardFragment);

})();
