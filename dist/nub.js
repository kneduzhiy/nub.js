/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["$"] = factory();
	else
		root["$"] = factory();
})(self, function() {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/nub.core.ts":
/*!*************************!*\
  !*** ./src/nub.core.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Nub)\n/* harmony export */ });\n/* harmony import */ var _nub_elements__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./nub.elements */ \"./src/nub.elements.ts\");\n/* harmony import */ var _nub_errors__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./nub.errors */ \"./src/nub.errors.ts\");\n/* harmony import */ var _nub_settings__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./nub.settings */ \"./src/nub.settings.ts\");\n\r\n\r\n\r\nvar ParseMode;\r\n(function (ParseMode) {\r\n    ParseMode[ParseMode[\"Attribute\"] = 0] = \"Attribute\";\r\n    ParseMode[ParseMode[\"Tag\"] = 1] = \"Tag\";\r\n})(ParseMode || (ParseMode = {}));\r\nclass Nub {\r\n    constructor(settings) {\r\n        window.__Nub = this;\r\n        if (settings.root == null) {\r\n            throw _nub_errors__WEBPACK_IMPORTED_MODULE_1__.NubErrors.NoRootElement;\r\n        }\r\n        this.rootElement = document.querySelector(settings.root);\r\n        if (this.rootElement == null) {\r\n            throw _nub_errors__WEBPACK_IMPORTED_MODULE_1__.NubErrors.NoRootElement;\r\n        }\r\n        this.init(settings);\r\n    }\r\n    init(settings) {\r\n        this.data = settings.data;\r\n        this.functions = settings.functions;\r\n        _nub_elements__WEBPACK_IMPORTED_MODULE_0__[\"default\"].register();\r\n        this.initObservers();\r\n        this.rerender();\r\n        this.parseEvents();\r\n    }\r\n    rerender() {\r\n        this.parseVariables(ParseMode.Attribute);\r\n        this.parseVariables(ParseMode.Tag);\r\n        this.parseFunctions(ParseMode.Attribute);\r\n        this.parseFunctions(ParseMode.Tag);\r\n        this.parseConditionals();\r\n    }\r\n    initObservers() {\r\n        Object.keys(this.data).forEach((val) => {\r\n            this.data[\"_\" + val] = this.data[val];\r\n            const self = this;\r\n            Object.defineProperty(this.data, val, {\r\n                get: function () {\r\n                    return this[\"_\" + val];\r\n                },\r\n                set: function (v) {\r\n                    this[\"_\" + val] = v;\r\n                    self.rerender();\r\n                },\r\n            });\r\n        });\r\n        console.log(\"[nub.js] Initialized observers\");\r\n    }\r\n    parseVariables(parseMode) {\r\n        const nubVarElements = parseMode == ParseMode.Attribute\r\n            ? document.querySelectorAll(\"[\\\\\" + _nub_settings__WEBPACK_IMPORTED_MODULE_2__.NubGlobals.VariableAttributeName + \"]\")\r\n            : document.querySelectorAll(_nub_settings__WEBPACK_IMPORTED_MODULE_2__.NubGlobals.VariableTagName);\r\n        nubVarElements.forEach((elem) => {\r\n            const varElement = elem;\r\n            const variableName = parseMode == ParseMode.Attribute\r\n                ? elem.getAttribute(\"#var\")\r\n                : varElement.__NubVariable;\r\n            if (variableName == null) {\r\n                throw _nub_errors__WEBPACK_IMPORTED_MODULE_1__.NubErrors.VariableNoValue;\r\n            }\r\n            const variableValue = this.data[variableName];\r\n            if (variableValue == null) {\r\n                throw _nub_errors__WEBPACK_IMPORTED_MODULE_1__.NubErrors.VariableNotFound;\r\n            }\r\n            elem.innerHTML = variableValue;\r\n        });\r\n    }\r\n    parseFunctions(parseMode) {\r\n        const nubFuncElements = parseMode == ParseMode.Attribute\r\n            ? document.querySelectorAll(\"[\\\\\" + _nub_settings__WEBPACK_IMPORTED_MODULE_2__.NubGlobals.FunctionAttributeName + \"]\")\r\n            : document.querySelectorAll(_nub_settings__WEBPACK_IMPORTED_MODULE_2__.NubGlobals.FunctionTagName);\r\n        nubFuncElements.forEach((elem) => {\r\n            const funcElement = elem;\r\n            const functionName = parseMode == ParseMode.Attribute\r\n                ? elem.getAttribute(_nub_settings__WEBPACK_IMPORTED_MODULE_2__.NubGlobals.FunctionAttributeName)\r\n                : funcElement.__NubFunction;\r\n            if (functionName == null) {\r\n                throw _nub_errors__WEBPACK_IMPORTED_MODULE_1__.NubErrors.VariableNoValue;\r\n            }\r\n            var functionValue = eval(\"window.__Nub.functions.\" + functionName);\r\n            elem.innerHTML = functionValue;\r\n        });\r\n    }\r\n    parseConditionals() {\r\n        const ifConditions = document.querySelectorAll(\"[if]\");\r\n        ifConditions.forEach((elem) => {\r\n            var code = elem.getAttribute(\"if\");\r\n            var isFunc = code.indexOf(\"(\") !== -1 && code.indexOf(\")\") !== -1;\r\n            const condition = (isFunc\r\n                ? eval(\"window.__Nub.functions.\" + code)\r\n                : eval(\"window.__Nub.data.\" + code));\r\n            elem.style.display = condition ? \"block\" : \"none\";\r\n        });\r\n    }\r\n    parseEvents() {\r\n        const clickEvent = document.querySelectorAll(\"[n-click]\");\r\n        const inputEvent = document.querySelectorAll(\"input[n-input], input[n-bind]\");\r\n        const focusEvent = document.querySelectorAll(\"[n-focus]\");\r\n        clickEvent.forEach((elem) => {\r\n            elem.addEventListener(\"click\", function () {\r\n                const action = elem.getAttribute(\"n-click\");\r\n                eval(\"window.__Nub.functions.\" + action);\r\n            });\r\n        });\r\n        inputEvent.forEach((elem) => {\r\n            const self = this;\r\n            elem.addEventListener(\"input\", function () {\r\n                const value = elem.value;\r\n                const bindVar = elem.getAttribute(\"n-bind\");\r\n                if (bindVar != null) {\r\n                    self.data[bindVar] = value;\r\n                    return;\r\n                }\r\n                const action = elem.getAttribute(\"n-input\");\r\n                eval(\"window.__Nub.functions.\" +\r\n                    action +\r\n                    '(\"' +\r\n                    elem.value +\r\n                    '\")');\r\n            });\r\n        });\r\n        focusEvent.forEach((elem) => {\r\n            elem.addEventListener(\"focus\", function () {\r\n                const action = elem.getAttribute(\"n-focus\");\r\n                eval(\"window.__Nub.functions.\" + action);\r\n            });\r\n        });\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://$/./src/nub.core.ts?");

/***/ }),

/***/ "./src/nub.elements.ts":
/*!*****************************!*\
  !*** ./src/nub.elements.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"NubVarElement\": () => (/* binding */ NubVarElement),\n/* harmony export */   \"NubFuncElement\": () => (/* binding */ NubFuncElement),\n/* harmony export */   \"default\": () => (/* binding */ NubElements)\n/* harmony export */ });\nclass NubVarElement extends HTMLElement {\r\n    constructor() {\r\n        super();\r\n        this.__NubVariable = this.innerText;\r\n    }\r\n}\r\nclass NubFuncElement extends HTMLElement {\r\n    constructor() {\r\n        super();\r\n        this.__NubFunction = this.innerText;\r\n    }\r\n}\r\nclass NubElements {\r\n    static register() {\r\n        window.customElements.define(\"n-var\", NubVarElement);\r\n        window.customElements.define(\"n-func\", NubFuncElement);\r\n        console.log(\"[nub.js] Registered NubElements\");\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://$/./src/nub.elements.ts?");

/***/ }),

/***/ "./src/nub.errors.ts":
/*!***************************!*\
  !*** ./src/nub.errors.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"NubErrors\": () => (/* binding */ NubErrors)\n/* harmony export */ });\nvar _a;\r\nclass NubErrors {\r\n    static error(message) {\r\n        return `${this._NubLogTag} ${message}`;\r\n    }\r\n}\r\n_a = NubErrors;\r\nNubErrors._NubLogTag = \"[nub.js]\";\r\nNubErrors.NoRootElement = _a.error(\"No root element specified\");\r\nNubErrors.RootElementNotFound = _a.error(\"Root element not found\");\r\nNubErrors.VariableNoValue = _a.error(\"Variable declared but has no value\");\r\nNubErrors.VariableNotFound = _a.error(\"Variable not found\");\r\n\n\n//# sourceURL=webpack://$/./src/nub.errors.ts?");

/***/ }),

/***/ "./src/nub.settings.ts":
/*!*****************************!*\
  !*** ./src/nub.settings.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"NubGlobals\": () => (/* binding */ NubGlobals)\n/* harmony export */ });\nclass NubGlobals {\r\n}\r\nNubGlobals.VariableTagName = \"n-var\";\r\nNubGlobals.VariableAttributeName = \"#var\";\r\nNubGlobals.FunctionTagName = \"n-func\";\r\nNubGlobals.FunctionAttributeName = \"#func\";\r\n\n\n//# sourceURL=webpack://$/./src/nub.settings.ts?");

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
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
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
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/nub.core.ts");
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});