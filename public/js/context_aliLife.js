(window.webpackJsonp=window.webpackJsonp||[]).push([["context_aliLife"],{"./src/utils/context/aliLife.js":
/*!**************************************!*\
  !*** ./src/utils/context/aliLife.js ***!
  \**************************************/
/*! exports provided: default */function(module,__webpack_exports__,__webpack_require__){"use strict";eval('__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var babel_runtime_core_js_promise__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! babel-runtime/core-js/promise */ "./node_modules/babel-runtime/core-js/promise.js");\n/* harmony import */ var babel_runtime_core_js_promise__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_core_js_promise__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! babel-runtime/helpers/classCallCheck */ "./node_modules/babel-runtime/helpers/classCallCheck.js");\n/* harmony import */ var babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! babel-runtime/helpers/createClass */ "./node_modules/babel-runtime/helpers/createClass.js");\n/* harmony import */ var babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _gps_convert__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./gps_convert */ "./src/utils/context/gps_convert.js");\n\n\n\n\n\nvar AliLife = function () {\n  function AliLife() {\n    babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default()(this, AliLife);\n  }\n\n  babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default()(AliLife, [{\n    key: "ready",\n    value: function ready() {\n      var _this = this;\n\n      return new babel_runtime_core_js_promise__WEBPACK_IMPORTED_MODULE_0___default.a(function (resolve) {\n        var ali = window.AlipayJSBridge;\n        if (ali) {\n          _this.alipay = ali;\n          return resolve(true);\n        }\n        document.addEventListener("AlipayJSBridgeReady", function () {\n          _this.alipay = ali;\n          resolve(true);\n        }, false);\n      });\n    }\n  }, {\n    key: "getLocation",\n    value: function getLocation() {\n      var _this2 = this;\n\n      return new babel_runtime_core_js_promise__WEBPACK_IMPORTED_MODULE_0___default.a(function (resolve) {\n        _this2.alipay.call("getCurrentLocation", { requestType: 0, bizType: "didi" }, function (result) {\n          var data = null;\n\n          if (!result.error) {\n            var point = _gps_convert__WEBPACK_IMPORTED_MODULE_3__["gcj02_To_Bd09"](result.longitude, result.latitude);\n            data = {\n              latitude: point.lat,\n              longitude: point.lng\n            };\n          }\n          resolve({\n            success: !result.error,\n            data: data,\n            result: result\n          });\n        });\n      });\n    }\n  }, {\n    key: "scanCode",\n    value: function scanCode(_ref) {\n      var _this3 = this;\n\n      var type = _ref.type,\n          needResult = _ref.needResult,\n          actionType = _ref.actionType;\n\n      return new babel_runtime_core_js_promise__WEBPACK_IMPORTED_MODULE_0___default.a(function (resolve) {\n        console.log("actionType: ", actionType || (needResult ? "scan" : "route"));\n        _this3.alipay.call("scan", {\n          type: type,\n          // 优先取actionType,没有则看needResult\n          actionType: actionType || (needResult ? "scan" : "scanAndRoute")\n        }, function (result) {\n          resolve({\n            success: !result.error,\n            data: result.codeContent,\n            result: result\n          });\n        });\n      });\n    }\n  }, {\n    key: "previewImage",\n    value: function previewImage(data) {\n      var _this4 = this;\n\n      return new babel_runtime_core_js_promise__WEBPACK_IMPORTED_MODULE_0___default.a(function (resolve) {\n        _this4.alipay.call("imageViewer", {\n          images: data.urls.map(function (u) {\n            return { u: u, t: u };\n          })\n          /* [{\n            u: \'https://gw.alipayobjects.com/zos/rmsportal/TVIpxsgyWyvrUKHwOvPY.jpg\',\n            t: \'https://gw.alipayobjects.com/zos/rmsportal/BSccQoKEYEaKgUAGMkdr.jpg\'\n          }]*/\n          , init: data.urls.indexOf(data.current)\n        }, function (result) {\n          resolve({\n            success: !result.error,\n            data: result\n          });\n        });\n      });\n    }\n  }]);\n\n  return AliLife;\n}();\n\n/* harmony default export */ __webpack_exports__["default"] = (AliLife);\n\n//# sourceURL=webpack:///./src/utils/context/aliLife.js?')},"./src/utils/context/gps_convert.js":
/*!******************************************!*\
  !*** ./src/utils/context/gps_convert.js ***!
  \******************************************/
/*! exports provided: bd09_To_Gcj02, gcj02_To_Bd09 */function(module,__webpack_exports__,__webpack_require__){"use strict";eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "bd09_To_Gcj02", function() { return bd09_To_Gcj02; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "gcj02_To_Bd09", function() { return gcj02_To_Bd09; });\nvar PI = Math.PI * 3000.0 / 180.0;\n\nfunction bd09_To_Gcj02(bd_lon, bd_lng) {\n  var x = bd_lon - 0.0065,\n      y = bd_lng - 0.006;\n  var z = Math.sqrt(x * x + y * y) - 0.0002 * Math.sin(y * PI);\n  var theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * PI);\n  return {\n    lng: z * Math.cos(theta),\n    lat: z * Math.sin(theta)\n  };\n}\n\nfunction gcj02_To_Bd09(gg_lon, gg_lat) {\n  var x = gg_lon,\n      y = gg_lat;\n  var z = Math.sqrt(x * x + y * y) + 0.0002 * Math.sin(y * PI);\n  var theta = Math.atan2(y, x) + 0.000003 * Math.cos(x * PI);\n  return {\n    lng: z * Math.cos(theta) + 0.0065,\n    lat: z * Math.sin(theta) + 0.006\n  };\n}\n\n//# sourceURL=webpack:///./src/utils/context/gps_convert.js?')}}]);