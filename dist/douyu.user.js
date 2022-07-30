// ==UserScript==
// @name                斗鱼直播助手
// @namespace           https://github.com/Eished/douyu-helper
// @version             2022.07.31
// @description         斗鱼直播自动切换画质，全局设置最高画质或最低画质，单独设置每个直播间：原画、4K、2K、1080p、蓝光、720p、超清、高清清晰度。
// @author              Eished
// @copyright           Eished
// @license             MIT
// @match               *://*.douyu.com/*
// @run-at              document-idle
// @supportURL          https://github.com/Eished/douyu-helper/issues
// @homepage            https://github.com/Eished/douyu-helper
// @grant               GM_getValue
// @grant               GM_setValue
// @grant               GM_registerMenuCommand
// @icon                https://www.google.com/s2/favicons?domain=douyu.com
// ==/UserScript==
/* eslint-disable */ /* spell-checker: disable */
// @[ You can find all source codes in GitHub repo ]
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 752:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
var app = function () {
    var videoSub = document.querySelector('.layout-Player-videoSub');
    if (!videoSub) {
        return;
    }
    var rid = new URLSearchParams(window.location.search).get('rid');
    if (!rid) {
        var results = window.location.pathname.match(/[\d]{1,10}/);
        if (results) {
            rid = results[0];
        }
        else {
            console.debug('未找到直播间');
            return;
        }
    }
    var Clarities = ['全局默认最高画质', '全局默认最低画质'];
    var selectedClarity = GM_getValue(rid);
    var defaultClarity = GM_getValue('defaultClarity');
    var selectClarity = function (list) {
        var notFoundCount = 0;
        list.forEach(function (li) {
            var availableClarity = li.innerText;
            if (!availableClarity)
                return;
            GM_registerMenuCommand(availableClarity, function () {
                GM_setValue(rid, availableClarity);
                li.click();
            });
            if (selectedClarity === availableClarity) {
                li.click();
            }
            else {
                notFoundCount++;
            }
        });
        if (selectedClarity === Clarities[0]) {
            list[0].click();
        }
        else if (selectedClarity === Clarities[1]) {
            list[list.length - 1].click();
        }
        else if (notFoundCount === list.length) {
            if (defaultClarity === 0) {
                list[list.length - 1].click();
            }
            else {
                list[0].click();
            }
        }
        Clarities.forEach(function (clarity, index) {
            GM_registerMenuCommand(clarity, function () {
                if (index === 0) {
                    list[index].click();
                    GM_setValue('defaultClarity', 1);
                }
                else {
                    list[list.length - 1].click();
                    GM_setValue('defaultClarity', 0);
                }
            });
        });
    };
    var observer = new MutationObserver(function () {
        var controller = videoSub === null || videoSub === void 0 ? void 0 : videoSub.querySelector("[value=\"\u753B\u8D28 \"]");
        if (controller) {
            observer.disconnect();
            var ul = controller.nextElementSibling;
            var list = ul === null || ul === void 0 ? void 0 : ul.querySelectorAll('li');
            list ? selectClarity(list) : console.debug('斗鱼直播助手：未找到画质选项');
        }
    });
    observer.observe(videoSub, {
        childList: true,
        subtree: true,
    });
};
exports["default"] = app;


/***/ }),

/***/ 607:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var app_1 = __importDefault(__webpack_require__(752));
(0, app_1.default)();


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
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__(607);
/******/ 	
/******/ })()
;