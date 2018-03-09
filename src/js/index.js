const dotWidth = 12;

document.addEventListener('DOMContentLoaded', () => {
  [].forEach.call(document.querySelectorAll('.animate'), function (carousel) {
    var canMove = false;
    var previousLeft = null;
    var lengthImg = carousel.querySelectorAll('img').length;
    var imgWidth = parseFloat(getComputedStyle(carousel.querySelector('img')).width);
    var maxLeft = (lengthImg - 1) * imgWidth;
    var wrapIndicators = document.createElement('ul');

    indicators();
    carousel.addEventListener('mousedown', mouseDown, false);
    carousel.addEventListener('touchstart', mouseDown, false);

    carousel.addEventListener('mouseup', mouseUp , false);
    carousel.addEventListener('touchend', mouseUp , false);

    carousel.addEventListener('mousemove', moveImages, false);
    carousel.addEventListener('touchmove', moveImages, false);

    carousel.parentNode.querySelector('.left-arrow').addEventListener('click', function () {
      var focusedIndex = [].findIndex.call(carousel.querySelectorAll('img'), function (element) {
        return element.classList.contains('focused');
      });
      focusedIndex--;
      if (focusedIndex < 0) {
        focusedIndex = lengthImg - 1;
      }

      wrapIndicators.querySelector('.dot.active').classList.remove('active');
      wrapIndicators.querySelectorAll('.dot')[focusedIndex].classList.add('active');
      carousel.style.left = -focusedIndex * imgWidth + 'px';
      carousel.querySelector('img.focused').classList.remove('focused');
      carousel.querySelectorAll('img')[focusedIndex].classList.add('focused');
    }, false);
    carousel.parentNode.querySelector('.right-arrow').addEventListener('click', function () {
      var focusedIndex = [].findIndex.call(carousel.querySelectorAll('img'), function (element) {
        return element.classList.contains('focused');
      });
      focusedIndex++;
      if (focusedIndex > lengthImg - 1) {
        focusedIndex = 0;
      }

      wrapIndicators.querySelector('.dot.active').classList.remove('active');
      wrapIndicators.querySelectorAll('.dot')[focusedIndex].classList.add('active');
      carousel.style.left = -focusedIndex * imgWidth + 'px';
      carousel.querySelector('img.focused').classList.remove('focused');
      carousel.querySelectorAll('img')[focusedIndex].classList.add('focused');
    }, false);

    function mouseDown () {
      canMove = true;
    };

    function mouseUp () {
      var carouselLeftAbs = Math.abs(parseFloat(getComputedStyle(carousel).left));
      var focusedIndex = [].findIndex.call(carousel.querySelectorAll('img'), function (element) {
        return element.classList.contains('focused');
      });
      if (focusedIndex * imgWidth - imgWidth / 2 > carouselLeftAbs) {
        focusedIndex--;
      } else if (focusedIndex * imgWidth + imgWidth / 2 < carouselLeftAbs) {
        focusedIndex++;
      }

      wrapIndicators.querySelector('.dot.active').classList.remove('active');
      wrapIndicators.querySelectorAll('.dot')[focusedIndex].classList.add('active');
      carousel.style.left = -focusedIndex * imgWidth + 'px';
      carousel.querySelector('img.focused').classList.remove('focused');
      carousel.querySelectorAll('img')[focusedIndex].classList.add('focused');
      canMove = false;
      previousLeft = null;
    };

    function indicators() {
        var carouselLeftAbs = Math.abs(parseFloat(getComputedStyle(carousel).left));
        var index = (carouselLeftAbs / imgWidth) | 0;
        const margin = `0 calc(${100 / lengthImg / 2}% - ${dotWidth / 2}px)`;
        wrapIndicators.classList.add('wrap-indicators');

       if (lengthImg > 1) {
         carousel.after(wrapIndicators);
         for (let i = 0; i < lengthImg; i++) {
           const dot = document.createElement('li');
           dot.classList.add('dot');
           dot.style.margin = margin;

           dot.setAttribute('value', i);
           dot.addEventListener('click', (e) => {
             index = e.target.value;
             wrapIndicators.querySelector('.dot.active').classList.remove('active');
             wrapIndicators.querySelectorAll('.dot')[index].classList.add('active');
             carousel.style.left = -index * imgWidth + 'px';
             carousel.querySelector('img.focused').classList.remove('focused');
             carousel.querySelectorAll('img')[index].classList.add('focused');
           });

           if (i === 0) {
             dot.classList.add('active');
           }

           wrapIndicators.appendChild(dot);
         };
       };
     };

    function moveImages (event) {
      if (canMove) {
        if (previousLeft) {
          var left = parseInt(carousel.style.left || 0) + (event.clientX - previousLeft) * 2;
          if (left > 0) {
            left = 0;
          } else if (maxLeft < Math.abs(left)) {
            left = -maxLeft;
          }
          carousel.style.left = left + 'px';
        };
        previousLeft = event.clientX;

      };
    };
  });

  document.addEventListener('mousemove', function (event) {
    event.preventDefault();
  }, false);
}, false);
