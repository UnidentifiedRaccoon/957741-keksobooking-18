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
    cardType.textContent = cardInfo.offer.type;

    var cardCapacity = card.querySelector('.popup__text--capacity');
    cardCapacity.textContent = cardInfo.offer.rooms + ' комнаты для ' + cardInfo.offer.guests + ' гостей';

    var cardTime = card.querySelector('.popup__text--time');
    cardTime.textContent = 'Заезд после ' + cardInfo.offer.checkin + ', выезд до ' + cardInfo.offer.checkout;

    var cardFeatures = card.querySelector('.popup__features');
    var featuresFragment = document.createDocumentFragment();
    // Получение содержимого cardFeatures
    var cardFeaturesChildren = cardFeatures.querySelectorAll('li');
    // Для каждого элемента массива cardFeaturesChildren проводим проверку на содержание класса
    // Один из классов элемента должен иметь любую из приставок перечисленных в массиве cardInfo.offer.features
    for (var i = 0; i < cardInfo.offer.features.length; i++) {
      var featureChild = cardFeaturesChildren[i];
      for (var j = 0; j < cardInfo.offer.features.length; j++) {
        if (featureChild.classList.contains('popup__feature--' + cardInfo.offer.features[j])) {
          featuresFragment.appendChild(featureChild);
        }
      }
    }
    // Очистка содержимого
    cardFeatures.textContent = '';
    // Вставка нужного содержимого
    cardFeatures.appendChild(featuresFragment);

    var cardDescription = card.querySelector('.popup__description');
    cardDescription.textContent = cardInfo.offer.description;


    var cardPhotos = card.querySelector('.popup__photos');
    var photosFragment = document.createDocumentFragment();
    // Получение содержимого cardFeatures
    var cardPhotosChild = cardPhotos.querySelector('img');
    // Клонирование шаблона img, его размножение и вставка в fragment
    for (var z = 0; z < cardInfo.offer.photos.length; z++) {
      var imgChild = cardPhotosChild.cloneNode(true);
      imgChild.src = cardInfo.offer.photos[z];
      photosFragment.appendChild(imgChild);
    }
    // Очистка содержимого
    cardPhotos.textContent = '';
    // Вставка нужного содержимого
    cardPhotos.appendChild(photosFragment);

    var cardAvatar = card.querySelector('.popup__avatar');
    cardAvatar.src = cardInfo.author.avatar;

    return card;
  };

  window.card = {
    renderPinCard: renderCard
  };
})();
