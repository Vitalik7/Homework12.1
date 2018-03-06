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

    function mouseDown () {
      canMove = true;
    };

    function mouseUp () {
      var carouselLeftAbs = Math.abs(parseFloat(getComputedStyle(carousel).left));
      var nextImageIndex = (carouselLeftAbs / imgWidth) | 0;

      if (carouselLeftAbs % imgWidth > imgWidth / 4) {
        nextImageIndex++;
      };

      if (carouselLeftAbs <= 0) {
        nextImageIndex = 1;
      };

      if (carouselLeftAbs >= 600) {
        nextImageIndex = 2;
      }

      if (carouselLeftAbs >= 1200) {
        nextImageIndex = 3;
      }

      if (carouselLeftAbs >= 1800) {
        nextImageIndex = 4;
      }

      if (carouselLeftAbs >= 2400) {
        nextImageIndex = 0;
      };


      carousel.style.left = -nextImageIndex * imgWidth + 'px';
      canMove = false;
      previousLeft = null;
    };

    function indicators() {
      var carouselLeftAbs = Math.abs(parseFloat(getComputedStyle(carousel).left));
      var index = (carouselLeftAbs / imgWidth) | 0;

     wrapIndicators.classList.add('wrap-indicators');

     if (lengthImg > 1) {
       carousel.after(wrapIndicators);
       for (let i = 0; i < lengthImg; i++) {
         let dot = document.createElement('li');
         dot.classList.add('dot');

         dot.setAttribute('value', i);
         dot.addEventListener('click', (e) => {
           index = e.target.value;
           carousel.style.left = -index * imgWidth + 'px';
         });
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
