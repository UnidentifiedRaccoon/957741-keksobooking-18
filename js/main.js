'use strict';

//  Список констант
var AVATAR_NUMBERS = ['01', '02', '03', '04', '05', '06', '07', '08'];
var TITLES = ['Заголовок №1', 'Заголовок №2', 'Заголовок №3', 'Заголовок №4', 'Заголовок №5', 'Заголовок №6', 'Заголовок №7', 'Заголовок №8'];
var PRICES = ['1000', '2000', '3000', '4000'];
var ROOMS = ['1', '2', '3', '4'];
var GUESTS = ['1', '2', '3', '4', '5', '6'];
var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var CHECKIN_ARR = ['12:00', '13:00', '14:00'];
var CHECKOUT_ARR = ['12:00', '13:00', '14:00'];
var DESCRIPTIONS = ['Описание №1', 'Описание №2', 'Описание №3', 'Описание №4', 'Описание №5', 'Описание №6', 'Описание №7', 'Описание №8'];
var PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];
var MAP_PIN_AMOUNT = 8;
var LOCATION_X_OFFSET = 25;
var LOCATION_Y_MAX = 630;
var LOCATION_Y_MIN = 130;
var LOCATION_Y_OFFSET = 70;
var announcements = [];

var map = document.querySelector('.map');
var mapPinsListElement = map.querySelector('.map__pins');
var MAP_WIDTH = mapPinsListElement.offsetWidth;
var mapPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

// Функция для получение СЛУЧАЙНОЙ ЦИФРЫ в указанном диапазоне
// Прим: так как для округления случайного числа исп. Math.floor() то к максимальному числу необходимо добавить один (max + 1)
var getRandomNumber = function (min, max) {
  return Math.floor(min + Math.random() * (max + 1 - min));
};

// Функция для получения СЛУЧАЙНОГО ЭЛЕМЕНТА из массива
var getRandomArrayElement = function (arr) {
  var randomNumber = getRandomNumber(0, arr.length - 1);
  return arr[randomNumber];
};

// Функция возращаюшая обьект мага с рандомными свойствами, заданными на основании данных массивов
var getAnnouncementObject = function (avatarNumber, title, prices, types, rooms, guests, checkinArr, checkoutArr, features, description, photos) {
  var location = {
    'x': getRandomNumber(0, MAP_WIDTH),
    'y': getRandomNumber(LOCATION_Y_MIN, LOCATION_Y_MAX),
  };
  var announcement = {
    'author': {
      'avatar': 'img/avatars/user' + avatarNumber + '.png',
    },
    'offer': {
      'title': title,
      'address': location.x + ', ' + location.y,
      'price': getRandomArrayElement(prices),
      'type': getRandomArrayElement(types),
      'rooms': getRandomArrayElement(rooms),
      'guests': getRandomArrayElement(guests),
      'checkin': getRandomArrayElement(checkinArr),
      'checkout': getRandomArrayElement(checkoutArr),
      'features': features.slice(0, getRandomNumber(0, features.length)),
      'description': description,
      'photos': photos.slice(0, getRandomNumber(0, photos.length)),
    },
    'location': {
      'x': location.x,
      'y': location.y,
    },
  };
  return announcement;
};

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

// Наполнение массива announcement обьектами обьявлений
// Если ПЕРЕДАЕТСЯ массив С указанием индекса, значит необходимо получить из массива ТОЧНОЕ ЗНАЧЕНИЕ(такое, которое НЕ МОЖЕТ повторяться в разных обьеках)
// Если ПЕРЕДАЕТСЯ массив БЕЗ указания индекса, значит необходимо получить из массива СЛУЧАЙНОЕ ЗНАЧЕНИЕ(-ИЯ)(такое, которое МОЖЕТ повторяться в разных обьеках)
// Если массив НЕ ПЕРЕДАЕТСЯ, значит необходимо получить СЛУЧАЙНОЕ ЗНАЧЕНИЕ
// Наполнение fragment`а DOM - элементами обьявлений
var fragment = document.createDocumentFragment();
for (var i = 0; i < MAP_PIN_AMOUNT; i++) {
  announcements[i] = getAnnouncementObject(AVATAR_NUMBERS[i], TITLES[i], PRICES, TYPES, ROOMS, GUESTS, CHECKIN_ARR, CHECKOUT_ARR, FEATURES, DESCRIPTIONS[i], PHOTOS);
  fragment.appendChild(renderMapPin(announcements[i]));
}
// Вставка fragment`а на страницу(будет использоваться в следующих заданиях)
// mapPinsListElement.appendChild(fragment);

var adForm = document.querySelector('.ad-form');
var filterForm = document.querySelector('.map__filters');
var mainMapPin = document.querySelector('.map__pin--main');
var inputAddress = adForm.querySelector('#address');
var selectRoomNumbers = document.querySelector('#room_number');
var selectCapacity = document.querySelector('#capacity');
var ENTER_KEYCODE = 13;
var MAIN_LOCATION_Y_OFFSET = mainMapPin.offsetHeight;
var MAIN_LOCATION_X_OFFSET = mainMapPin.offsetWidth;

// Функция для удаления указанного атрибута во всех элементах(детях) указаннного родителя
var removeChildrenAttribute = function (parent, attr) {
  var children = parent.querySelectorAll('[' + attr + ']');
  for (var j = 0; j < children.length; j++) {
    children[j].removeAttribute(attr);
  }
};

// Функция для перевода страницы в активное сосотояние
var makeActivePage = function () {
  map.classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');
  removeChildrenAttribute(filterForm, 'disabled');
  removeChildrenAttribute(adForm, 'disabled');
  inputAddress.value = getPointIndicateByMainMapPin(mainMapPin.style.top, mainMapPin.style.left);
};

// Подучение координат из CSS свойств элемента
var getPointIndicateByMainMapPin = function (top, left) {
  left = Number(left.replace(/px/g, '')) + MAIN_LOCATION_X_OFFSET / 2;
  if (map.classList.contains('map--faded')) {
    top = Number(top.replace(/px/g, '')) + MAIN_LOCATION_Y_OFFSET / 2;
  } else {
    top = Number(top.replace(/px/g, '')) + MAIN_LOCATION_Y_OFFSET;
  }
  return Math.floor(left) + ', ' + Math.floor(top);
};

// Функция для проверкии соответствия значения комнат и гостей
var validationOfRoomsAndGuests = function () {
  var roomNumbers = selectRoomNumbers;
  var capacity = selectCapacity;
  if (roomNumbers.value === '100' || capacity.value === '0') {
    if (roomNumbers.value === '100' && capacity.value === '0') {
      capacity.setCustomValidity('');
    } else {
      capacity.setCustomValidity('100 комнат - помещение не для гостей');
    }
  } else if (roomNumbers.value < capacity.value) {
    capacity.setCustomValidity('Слишком много гостей');
  } else {
    capacity.setCustomValidity('');
  }
};

// Вызов функции для валидации изначальных значений
validationOfRoomsAndGuests();

// Обработчики изменения значениий select'а комнат и гостей
selectRoomNumbers.addEventListener('change', validationOfRoomsAndGuests);
selectCapacity.addEventListener('change', validationOfRoomsAndGuests);

// Запись изначальных координат в поле адреса
inputAddress.value = getPointIndicateByMainMapPin(mainMapPin.style.top, mainMapPin.style.left);

// Обработчики клика и ENTER'a для перевода страници в активное состояние
mainMapPin.addEventListener('mousedown', makeActivePage);
mainMapPin.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    makeActivePage();
  }
});
