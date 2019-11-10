// Файл avatar.js
'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var avatarFileChooser = document.querySelector('#avatar');
  var avatarBox = document.querySelector('.ad-form-header__preview');
  var avatarImg = avatarBox.querySelector('img');
  var photoFileChooser = document.querySelector('#images');
  var photoBox = document.querySelector('.ad-form__photo');
  var photoBoxColor = photoBox.style.backgroundColor;
  var photoBoxPosition = ' 0 0';
  var photoBoxSize = photoBox.offsetWidth + 'px, ' + photoBox.offsetHeight + 'px';
  var photoBoxRepeat = ' no-repeat';

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
          photoBox.style.background = photoBoxColor + 'url(\'' + reader.result + '\')' + photoBoxRepeat + photoBoxPosition;
          photoBox.style.backgroundSize = photoBoxSize;
        });
        reader.readAsDataURL(file);
      }
    }
  });
})();
