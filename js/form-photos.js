// Файл avatar.js
'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var avatarFileChooser = document.querySelector('#avatar');
  var avatarBox = document.querySelector('.ad-form-header__preview');
  var avatarImg = avatarBox.querySelector('img');
  var avatarImgSrc = avatarImg.src;
  var photoContainer = document.querySelector('.ad-form__photo-container');
  var photoFileChooser = photoContainer.querySelector('#images');
  var photoBox = photoContainer.querySelector('.ad-form__photo');
  var photoBoxColor = photoBox.style.backgroundColor;
  var photoBoxPosition = ' 0 0';
  var photoBoxSize = photoBox.offsetWidth + 'px, ' + photoBox.offsetHeight + 'px';
  var photoBoxRepeat = ' no-repeat';

  // Обработка выбора аватарки
  avatarFileChooser.addEventListener('change', function () {
    var file = avatarFileChooser.files[0];

    if (file) {
      var fileName = file.name.toLowerCase();
      var matches = FILE_TYPES.some(function (it) {
        return fileName.endsWith(it);
      });

      if (matches) {
        var reader = new FileReader();
        reader.addEventListener('load', function () {
          avatarBox.style.padding = '5px';
          avatarImg.width = avatarBox.offsetWidth;
          avatarImg.height = avatarBox.offsetHeight;
          avatarImg.src = reader.result;
        });
        reader.readAsDataURL(file);
      }
    }
  });

  // Обработка выбора фотографии
  photoFileChooser.addEventListener('change', function () {
    var file = photoFileChooser.files[0];

    if (file) {
      var fileName = file.name.toLowerCase();
      var matches = FILE_TYPES.some(function (it) {
        return fileName.endsWith(it);
      });

      if (matches) {
        var reader = new FileReader();
        reader.addEventListener('load', function () {
          var box = photoBox.cloneNode(true);
          box.classList.remove('hidden');
          photoBox.classList.add('hidden');
          box.style.background = photoBoxColor + 'url(\'' + reader.result + '\')' + photoBoxRepeat + photoBoxPosition;
          box.style.backgroundSize = photoBoxSize;
          photoContainer.appendChild(box);
        });
        reader.readAsDataURL(file);
      }
    }
  });

  var reset = function () {
    avatarImg.src = avatarImgSrc;
    photoBox.style.background = '';
  };

  window.formPhoto = {
    reset: reset,
  };
})();
