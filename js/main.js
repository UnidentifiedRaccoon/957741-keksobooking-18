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
var announcements = [];

var map = document.querySelector('.map');
map.classList.remove('map--faded');
var mapPinsListElement = map.querySelector('.map__pins');
var MAP_WIDTH = mapPinsListElement.offsetWidth;
// console.log(mapPinsListElement.offsetWidth);
var mapPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');


// Функция для получение СЛУЧАЙНОЙ ЦИФРЫ в указанном диапазоне
var getRandomNumber = function (min, max) {
  return Math.floor(min + Math.random() * (max + 1 - min));
};

// Функция для получения СЛУЧАЙНОГО ЭЛЕМЕНТА из массива
// Прим: так как величина длинны массива больше величины индекса последнего элемента массива, Math.random() никогда не выдает один, а Math.floor() округляет вниз
var getRandomArrayElement = function (arr) {
  var max = arr.length;
  var randomElement = Math.floor(Math.random() * max);
  return arr[randomElement];
};

// Функция для изменения длинны массива
var changeArrayLength = function (arr) {
  var changedArr = arr;
  changedArr.length = getRandomNumber(0, arr.length);
  return changedArr;
};

// Функция возращаюшая обьект мага с рандомными свойствами, заданными на основании данных массивов
var getAnnouncementObject = function (avatarNumber, title, prices, types, rooms, guests, checkinArr, checkoutArr, features, descriptions, photos) {
  var announcement = {
    'author': {
      'avatar': 'img/avatars/user' + avatarNumber + '.png',
    },
    'offer': {
      'title': title,
      // 'address': announcement.location.x + ', ' + announcement.location.y,
      'price': getRandomArrayElement(prices),
      'type': getRandomArrayElement(types),
      'rooms': getRandomArrayElement(rooms),
      'guests': getRandomArrayElement(guests),
      'checkin': getRandomArrayElement(checkinArr),
      'checkout': getRandomArrayElement(checkoutArr),
      'features': changeArrayLength(features),
      'description': getRandomArrayElement(descriptions),
      'photos': changeArrayLength(photos),
    },
    'location': {
      'x': getRandomNumber(0, MAP_WIDTH),
      'y': getRandomNumber(130, 630),
    },
  };
  return announcement;
};

// Наполнение массива announcement обьектами обьявлений
// Если ПЕРЕДАЕТСЯ массив С указанием индекса, значит необходимо получить из массива ТОЧНОЕ ЗНАЧЕНИЕ(такое, которое НЕ МОЖЕТ повторяться в разных обьеках)
// Если ПЕРЕДАЕТСЯ массив БЕЗ указания индекса, значит необходимо получить из массива СЛУЧАЙНОЕ ЗНАЧЕНИЕ(-ИЯ)(такое, которое МОЖЕТ повторяться в разных обьеках)
// Если массив НЕ ПЕРЕДАЕТСЯ, значит необходимо получить СЛУЧАЙНОЕ ЗНАЧЕНИЕ
for (var i = 0; i < MAP_PIN_AMOUNT; i++) {
  announcements[i] = getAnnouncementObject(AVATAR_NUMBERS[i], TITLES[i], PRICES, TYPES, ROOMS, GUESTS, CHECKIN_ARR, CHECKOUT_ARR, FEATURES, DESCRIPTIONS, PHOTOS);
}

// Создание DOM элемента обьявления на основе данных обьекта pin
var renderMapPin = function (pin) {
  var mapPin = mapPinTemplate.cloneNode(true);
  var mapPinImg = mapPin.querySelector('img');
  mapPinImg.alt = pin.offer.title;
  mapPinImg.src = pin.author.avatar;
  mapPin.setAttribute('style', 'left: ' + pin.location.x + 'px; ' + 'top: ' + pin.location.y + 'px;');
  return mapPin;
};

// Наполнение fragment`а DOM - элементами обьявлений
var fragment = document.createDocumentFragment();
for (var j = 0; j < announcements.length; j++) {
  fragment.appendChild(renderMapPin(announcements[j]));
}
// Вставка fragment`а на страницу
mapPinsListElement.appendChild(fragment);

// Отображение окна пользователя
// userWindow.querySelector('.setup-similar').classList.remove('hidden');
