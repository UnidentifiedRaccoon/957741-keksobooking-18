'use strict';

(function () {
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
  var LOCATION_Y_MAX = 630;
  var LOCATION_Y_MIN = 130;
  var MAP_PIN_AMOUNT = 8;

  var MAP_WIDTH = window.util.map.offsetWidth;

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

  // Наполнение массива announcement обьектами обьявлений
  // Если ПЕРЕДАЕТСЯ массив С указанием индекса, значит необходимо получить из массива ТОЧНОЕ ЗНАЧЕНИЕ(такое, которое НЕ МОЖЕТ повторяться в разных обьеках)
  // Если ПЕРЕДАЕТСЯ массив БЕЗ указания индекса, значит необходимо получить из массива СЛУЧАЙНОЕ ЗНАЧЕНИЕ(-ИЯ)(такое, которое МОЖЕТ повторяться в разных обьеках)
  // Если массив НЕ ПЕРЕДАЕТСЯ, значит необходимо получить СЛУЧАЙНОЕ ЗНАЧЕНИЕ
  var announcements = [];
  for (var i = 0; i < MAP_PIN_AMOUNT; i++) {
    announcements[i] = getAnnouncementObject(AVATAR_NUMBERS[i], TITLES[i], PRICES, TYPES, ROOMS, GUESTS, CHECKIN_ARR, CHECKOUT_ARR, FEATURES, DESCRIPTIONS[i], PHOTOS);
  }

  // экспорт данных модуля
  window.data = {
    announcements: announcements,
    locationYMax: LOCATION_Y_MAX,
    locationYMin: LOCATION_Y_MIN,
    mapWidth: MAP_WIDTH
  };

})();
