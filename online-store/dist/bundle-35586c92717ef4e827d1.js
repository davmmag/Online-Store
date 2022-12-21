/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/style.scss":
/*!************************!*\
  !*** ./src/style.scss ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://webpack-ts-starter/./src/style.scss?");

/***/ }),

/***/ "./src/app/app.ts":
/*!************************!*\
  !*** ./src/app/app.ts ***!
  \************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nvar functions_1 = __webpack_require__(/*! ../app/functions */ \"./src/app/functions.ts\");\nvar App = /** @class */ (function () {\n    function App() {\n    }\n    App.prototype.start = function () {\n        console.log(\"START\");\n        (0, functions_1.createElement)(\"div\", \"main__container\", \"main__filters\");\n        (0, functions_1.createElement)(\"div\", \"main__filters\", \"filters__title\", \"Фильтры\");\n        (0, functions_1.createElement)(\"div\", \"main__filters\", \"filters__content\");\n        (0, functions_1.createElement)(\"div\", \"filters__content\", \"filters-price\", \"Фильтр по ценам:\");\n        (0, functions_1.createElement)(\"div\", \"filters__content\", \"filters-size\", \"Фильтр по размеру:\");\n        (0, functions_1.createElement)(\"div\", \"filters__content\", \"filters-country\");\n        (0, functions_1.createElement)(\"div\", \"filters-country\", \"filters-country__title\", \"Страна:\");\n        (0, functions_1.createElement)(\"ul\", \"filters-country\", \"filters-country__menu\");\n        /*\n            uniqueArray(productsArray, \"country\").forEach (element => {\n                createElement(\"li\", \"filters-country__menu\", \"filters-country__item\", `${element}`);\n            });\n        */\n        (0, functions_1.createElement)(\"div\", \"filters__content\", \"filters-brand\");\n        (0, functions_1.createElement)(\"div\", \"filters-brand\", \"filters-brand__title\", \"Производитель\");\n        (0, functions_1.createElement)(\"ul\", \"filters-brand\", \"filters-brand__menu\");\n        /*\n            uniqueArray(productsArray, \"brand\").forEach (element => {\n                createElement(\"li\", \"filters-brand__menu\", \"filters-brand__item\", `${element}`);\n            });\n        */\n        (0, functions_1.createElement)(\"div\", \"filters__content\", \"filters-rectified\");\n        (0, functions_1.createElement)(\"div\", \"filters-rectified\", \"filters-rectified__title\", \"Ректификат:\");\n        (0, functions_1.createElement)(\"ul\", \"filters-rectified\", \"filters-rectified__menu\");\n        (0, functions_1.createElement)(\"li\", \"filters-rectified__menu\", \"filters-rectified__item\", \"\\u0414\\u0430\");\n        (0, functions_1.createElement)(\"li\", \"filters-rectified__menu\", \"filters-rectified__item\", \"\\u041D\\u0435\\u0442\");\n        (0, functions_1.createElement)(\"div\", \"main__container\", \"main__table\");\n    };\n    return App;\n}());\nexports[\"default\"] = App;\n\n\n//# sourceURL=webpack://webpack-ts-starter/./src/app/app.ts?");

/***/ }),

/***/ "./src/app/functions.ts":
/*!******************************!*\
  !*** ./src/app/functions.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.createElement = void 0;\nfunction createElement(type, parent, children, text) {\n    var elParent = document.querySelector(\".\".concat(parent));\n    if (elParent !== null) {\n        var elem = document.createElement(\"\".concat(type));\n        elem.className = \"\".concat(children);\n        if (text !== undefined) {\n            elem.innerHTML = \"\".concat(text);\n        }\n        elParent.append(elem);\n    }\n}\nexports.createElement = createElement;\n\n\n//# sourceURL=webpack://webpack-ts-starter/./src/app/functions.ts?");

/***/ }),

/***/ "./src/app/index.ts":
/*!**************************!*\
  !*** ./src/app/index.ts ***!
  \**************************/
/***/ (() => {

eval("\n// Your code\n\n\n//# sourceURL=webpack://webpack-ts-starter/./src/app/index.ts?");

/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\n__webpack_require__(/*! ./style.scss */ \"./src/style.scss\");\n__webpack_require__(/*! ./app/index */ \"./src/app/index.ts\");\nvar app_1 = __importDefault(__webpack_require__(/*! ./app/app */ \"./src/app/app.ts\"));\nvar app = new app_1.default();\napp.start();\n\n\n//# sourceURL=webpack://webpack-ts-starter/./src/main.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/main.ts");
/******/ 	
/******/ })()
;