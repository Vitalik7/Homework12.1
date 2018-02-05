document.addEventListener('DOMContentLoaded', () => {
  [].forEach.call(document.querySelectorAll('.slider .animate'), function (carousel) {
    var canMove = false;
    var previousLeft = null;
    var lengthImg = carousel.querySelectorAll('img').length;
    var imgWidth = parseFloat(getComputedStyle(carousel.querySelector('img')).width);
    var maxLeft = (lengthImg - 1) * imgWidth

    carousel.addEventListener('mousedown', mouseDown, false);
    carousel.addEventListener('touchstart', mouseDown, false);

    carousel.addEventListener('mouseup', mouseUp , false);
    carousel.addEventListener('touchend', mouseUp , false);

    carousel.addEventListener('mousemove', moveImages, false);
    carousel.addEventListener('touchmove', moveImages, false);

    function mouseDown () {
      canMove = true;
    };

    function mouseUp () {
      var carouselLeftAbs = Math.abs(parseFloat(getComputedStyle(carousel).left));
      var nextImageIndex = (carouselLeftAbs / imgWidth) | 0;
      if (carouselLeftAbs % imgWidth > imgWidth / 4) {
        nextImageIndex++;
      }

      if (carouselLeftAbs >= 2400) {
        nextImageIndex = 0
      }

      if (carouselLeftAbs <= 0) {
        nextImageIndex = 4
      }

      carousel.style.left = -nextImageIndex * imgWidth + 'px';
      canMove = false;
      previousLeft = null;

      if (nextImageIndex = 1) {
        carousel.classList.add('current')
      }
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
