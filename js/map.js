'use strict';

(function () {
  var ENTER_KEYCODE = 13;
  var ESC_KEYCODE = 27;

  // Функция показа карточки по клику на пин
  var showCard = function (pin) {
    // Сначала закрываем все карточки
    closeCard();
    // Затем открываем карточку того пина, на котором произошел клик
    pin.classList.add('map__pin--active');
    cardsArr[pin.id].classList.remove('visually-hidden');
    // Почему нажатие клавиши не срабатывает на карточке? Это может быть связано с отсутствием фокуса на карточке? Как это фиксить и нужно ли?
    // cardsArr[pin.id].addEventListener('keydown', onCloseXClick)
    // Добавляем кнопке закрытия карточки обработчик, для закрытия карточки
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
      cardsArr[j].classList.add('visually-hidden');
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
    window.util.map.addEventListener('mousedown', function (evt) {
      if (evt.target.className === 'map__pin' || evt.path[1].className === 'map__pin') {
        var selectedPin = getSelectedPin(evt);
        showCard(selectedPin);
      }
    });

    // Обработчик на map для открытия карточки по нажатию на ENTER на пине
    window.util.map.addEventListener('keydown', function (evt) {
      if (evt.keyCode === ENTER_KEYCODE) {
        if (evt.target.className === 'map__pin' || evt.path[1].className === 'map__pin') {
          var selectedPin = getSelectedPin(evt);
          showCard(selectedPin);
        }
      }
    });

    // Обработчик на map для закрытия карточки по нажатию на ESC
    window.util.map.addEventListener('keydown', function (evt) {
      if (evt.keyCode === ESC_KEYCODE) {
        closeCard();
      }
    });
  };

  var pinsFragment = document.createDocumentFragment();
  var cardsFragment = document.createDocumentFragment();
  var cardsArr = [];
  var pinsArr = [];
  for (var i = 0; i < window.data.announcements.length; i++) {
    // Получение DOM объектов пина и карточки
    var currentPin = window.pin.renderMapPin(window.data.announcements[i]);
    var currentCard = window.card.renderPinCard(window.data.announcements[i]);
    // Добавление всем пинам id для связи с карточкой
    currentPin.id = i;
    // Создание массивов пинов и карточек (нужно для реализации открытия/закрытия карточки при нажатиии на пин)
    cardsArr[i] = currentCard;
    pinsArr[i] = currentPin;
    // Наполнение fragment`а DOM - элементами обьявлений
    pinsFragment.appendChild(currentPin);
    cardsFragment.appendChild(currentCard);
  }
  // Добавление всех нужных обработчиков
  addListeners();

  window.map = {
    pinsFragment: pinsFragment,
    cardsFragment: cardsFragment
  };
})();
