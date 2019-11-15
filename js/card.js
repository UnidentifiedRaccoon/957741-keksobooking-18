'use strict';

(function () {
  var pinCardTemplate = document.querySelector('#card').content.querySelector('.map__card');

  var renderCard = function (cardInfo) {
    var card = pinCardTemplate.cloneNode(true);

    var cardTitle = card.querySelector('.popup__title');
    cardTitle.textContent = cardInfo.offer.title;

    var cardAddress = card.querySelector('.popup__text--address');
    cardAddress.textContent = cardInfo.offer.address;

    var cardPrice = card.querySelector('.popup__text--price');
    cardPrice.textContent = cardInfo.offer.price + '₽/ночь';

    var cardType = card.querySelector('.popup__type');
    switch (cardInfo.offer.type) {
      case 'flat':
        cardType.textContent = 'Квартира';
        break;
      case 'house':
        cardType.textContent = 'Дом';
        break;
      case 'palace':
        cardType.textContent = 'Дворец';
        break;
      case 'bungalo':
        cardType.textContent = 'Бунгало';
        break;
      default:
        cardType.textContent = 'Не определен';
    }

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
    for (var i = 0; i < cardFeaturesChildren.length; i++) {
      var featureChild = cardFeaturesChildren[i];
      cardInfo.offer.features.forEach(function (item) {
        if (featureChild.classList.contains('popup__feature--' + item)) {
          // Вставка нужного содержимого
          cardFeatures.appendChild(featureChild);
        }
      });
    }

    var cardDescription = card.querySelector('.popup__description');
    cardDescription.textContent = cardInfo.offer.description;
    var cardPhotos = card.querySelector('.popup__photos');
    // Получение содержимого cardFeatures
    var cardPhotosChild = cardPhotos.querySelector('img');
    // Очистка содержимого
    cardPhotos.textContent = '';
    // Клонирование шаблона img, его размножение и вставка в fragment
    cardInfo.offer.photos.forEach(function (item) {
      var imgChild = cardPhotosChild.cloneNode(true);
      imgChild.src = item;
      // Вставка нужного содержимого
      cardPhotos.appendChild(imgChild);
    });


    var cardAvatar = card.querySelector('.popup__avatar');
    cardAvatar.src = cardInfo.author.avatar;

    // Все карточки изначально скрыты
    card.classList.add('hidden');

    return card;
  };

  window.card = {
    renderPinCard: renderCard
  };
})();
