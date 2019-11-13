'use strict';

(function () {
  var MAX_ANNOUNCMENT_QUANTITY = 5;
  var ENTER_KEYCODE = 13;
  var ESC_KEYCODE = 27;
  var cardsArr = [];
  var pinsArr = [];
  var pinsFragment = document.createDocumentFragment();
  var cardsFragment = document.createDocumentFragment();
  var mapPinsListElement = window.util.map.querySelector('.map__pins');
  var pinsCarsListElement = document.querySelector('.map__filters-container');


  // Функция показа карточки по клику на пин
  var showCard = function (pin) {
    // Сначала закрываем все карточки
    closeCard();
    // Затем открываем карточку того пина, на котором произошел клик
    pin.classList.add('map__pin--active');
    cardsArr[pin.id].classList.remove('hidden');
    var closeX = cardsArr[pin.id].querySelector('.popup__close');
    closeX.addEventListener('click', onCloseXClick);
  };

  // Функция-Обработчик скрытия карточки
  var onCloseXClick = function () {
    closeCard();
  };

  // Функция скрывающая карточку
  var closeCard = function () {
    for (var j = 0; j < pinsArr.length; j++) {
      // Закрываем все карточки
      pinsArr[j].classList.remove('map__pin--active');
      cardsArr[j].classList.add('hidden');
      // Удаляем обработчик у всех кнопок закрытия карточек
      var closeX = cardsArr[j].querySelector('.popup__close');
      closeX.removeEventListener('click', onCloseXClick);
    }
  };

  // Функция получениия кнопки(пина) из данных обработчика;
  var getSelectedPin = function (evt) {
    var button;
    // Если мы кликнули на картинку в кнопке, то button присваивается значение родителя картинки
    // Иначе button присваивается значение кнопки
    if (evt.path[1].tagName.toLowerCase() === 'button') {
      button = evt.path[1];
    } else {
      button = evt.target;
    }
    return button;
  };

  // Функция добавления обработчиков
  var addListeners = function () {
    // Обработчик на map для открытия карточки по клику на пин
    window.addEventListener('mousedown', function (evt) {
      if (evt.target.className === 'map__pin' || evt.path[1].className === 'map__pin') {
        var selectedPin = getSelectedPin(evt);
        showCard(selectedPin);
      }
    });

    // Обработчик на map для открытия карточки по нажатию на ENTER на пине
    window.addEventListener('keydown', function (evt) {
      if (evt.keyCode === ENTER_KEYCODE) {
        if (evt.target.className === 'map__pin' || evt.path[1].className === 'map__pin') {
          var selectedPin = getSelectedPin(evt);
          showCard(selectedPin);
        }
      }
    });

    // Обработчик на map для закрытия карточки по нажатию на ESC
    window.addEventListener('keydown', function (evt) {
      if (evt.keyCode === ESC_KEYCODE) {
        closeCard();
      }
    });
  };

  window.renderAnnouncement = function (announcements, pinHidden) {

    var announcementQuantity = announcements.length > MAX_ANNOUNCMENT_QUANTITY ? MAX_ANNOUNCMENT_QUANTITY : announcements.length;
    for (var j = 0; j < pinsArr.length; j++) {
      mapPinsListElement.removeChild(pinsArr[j]);
      window.util.map.removeChild(cardsArr[j]);
    }
    pinsArr = [];
    cardsArr = [];
    for (var i = 0; i < announcementQuantity; i++) {
      if (announcements[i].hasOwnProperty('offer')) {

        // Получение DOM объектов пина и карточки
        var currentPin = window.pin.renderMapPin(announcements[i]);
        var currentCard = window.card.renderPinCard(announcements[i]);
        // Добавление всем пинам id для связи с карточкой
        currentPin.id = i;
        // Создание массивов пинов и карточек (нужно для реализации открытия/закрытия карточки при нажатиии на пин)
        cardsArr[i] = currentCard;
        pinsArr[i] = currentPin;
        // Наполнение fragment`а DOM - элементами обьявлений
        pinsFragment.appendChild(currentPin);
        cardsFragment.appendChild(currentCard);
        if (pinHidden) {
          currentPin.classList.add('hidden');
        }
      }
    }
    mapPinsListElement.appendChild(pinsFragment);
    window.util.map.insertBefore(cardsFragment, pinsCarsListElement);
    addListeners();
  };
})();
