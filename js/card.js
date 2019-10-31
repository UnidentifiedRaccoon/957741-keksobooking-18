'use strict';

(function () {
  var pinCardTemplate = document.querySelector('#card').content.querySelector('.map__card');
  var LOCATION_X_OFFSET = 25;
  var LOCATION_Y_OFFSET = 70;

  var renderCard = function (cardInfo) {
    var card = pinCardTemplate.cloneNode(true);

    var cardTitle = card.querySelector('.popup__title');
    cardTitle.textContent = cardInfo.offer.title;

    var cardAddress = card.querySelector('.popup__text--address');
    cardAddress.textContent = cardInfo.offer.address;

    var cardPrice = card.querySelector('.popup__text--price');
    cardPrice.textContent = cardInfo.offer.price + '₽/ночь';

    var cardType = card.querySelector('.popup__type');
    cardType.textContent = cardInfo.offer.type;

    var cardCapacity = card.querySelector('.popup__text--capacity');
    cardCapacity.textContent = cardInfo.offer.rooms + ' комнаты для ' + cardInfo.offer.guests + ' гостей';

    var cardTime = card.querySelector('.popup__text--time');
    cardTime.textContent = 'Заезд после ' + cardInfo.offer.checkin + ', выезд до ' + cardInfo.offer.checkout;

    var cardFeatures = card.querySelector('.popup__features');
    // Получение содержимого cardFeatures
    var cardFeaturesChildren = cardFeatures.querySelectorAll('li');
    // Очистка содержимого
    cardFeatures.textContent = '';
    // Для каждого элемента массива cardFeaturesChildren проводим проверку на содержание класса
    // Один из классов элемента должен иметь любую из приставок перечисленных в массиве cardInfo.offer.features
    for (var i = 0; i < cardInfo.offer.features.length; i++) {
      var featureChild = cardFeaturesChildren[i];
      for (var j = 0; j < cardInfo.offer.features.length; j++) {
        if (featureChild.classList.contains('popup__feature--' + cardInfo.offer.features[j])) {
          // Вставка нужного содержимого
          cardFeatures.appendChild(featureChild);
        }
      }
    }

    var cardDescription = card.querySelector('.popup__description');
    cardDescription.textContent = cardInfo.offer.description;


    var cardPhotos = card.querySelector('.popup__photos');
    // Получение содержимого cardFeatures
    var cardPhotosChild = cardPhotos.querySelector('img');
    // Очистка содержимого
    cardPhotos.textContent = '';
    // Клонирование шаблона img, его размножение и вставка в fragment
    for (var z = 0; z < cardInfo.offer.photos.length; z++) {
      var imgChild = cardPhotosChild.cloneNode(true);
      imgChild.src = cardInfo.offer.photos[z];
      // Вставка нужного содержимого
      cardPhotos.appendChild(imgChild);
    }


    var cardAvatar = card.querySelector('.popup__avatar');
    cardAvatar.src = cardInfo.author.avatar;

    card.style.left = (cardInfo.location.x + LOCATION_X_OFFSET) + 'px';
    card.style.top = (cardInfo.location.y + LOCATION_Y_OFFSET) + 'px';

    card.classList.add('visually-hidden');

    return card;
  };

  window.card = {
    renderPinCard: renderCard
  };
})();
