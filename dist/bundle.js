/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__js_index_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__js_index_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__js_index_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__css_style_scss__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__css_style_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__css_style_scss__);




/***/ }),
/* 1 */
/***/ (function(module, exports) {

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

      if (carouselLeftAbs >= imgWidth * (lengthImg - 1)) {
        focusedIndex = 0;
      } else if (carouselLeftAbs === 0) {
        focusedIndex = lengthImg - 1;
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


/***/ }),
/* 2 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map