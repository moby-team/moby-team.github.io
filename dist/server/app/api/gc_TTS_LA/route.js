"use strict";
(() => {
var exports = {};
exports.id = 319;
exports.ids = [319];
exports.modules = {

/***/ 39491:
/***/ ((module) => {

module.exports = require("assert");

/***/ }),

/***/ 14300:
/***/ ((module) => {

module.exports = require("buffer");

/***/ }),

/***/ 32081:
/***/ ((module) => {

module.exports = require("child_process");

/***/ }),

/***/ 6113:
/***/ ((module) => {

module.exports = require("crypto");

/***/ }),

/***/ 9523:
/***/ ((module) => {

module.exports = require("dns");

/***/ }),

/***/ 82361:
/***/ ((module) => {

module.exports = require("events");

/***/ }),

/***/ 57147:
/***/ ((module) => {

module.exports = require("fs");

/***/ }),

/***/ 13685:
/***/ ((module) => {

module.exports = require("http");

/***/ }),

/***/ 85158:
/***/ ((module) => {

module.exports = require("http2");

/***/ }),

/***/ 95687:
/***/ ((module) => {

module.exports = require("https");

/***/ }),

/***/ 41808:
/***/ ((module) => {

module.exports = require("net");

/***/ }),

/***/ 22037:
/***/ ((module) => {

module.exports = require("os");

/***/ }),

/***/ 71017:
/***/ ((module) => {

module.exports = require("path");

/***/ }),

/***/ 85477:
/***/ ((module) => {

module.exports = require("punycode");

/***/ }),

/***/ 63477:
/***/ ((module) => {

module.exports = require("querystring");

/***/ }),

/***/ 12781:
/***/ ((module) => {

module.exports = require("stream");

/***/ }),

/***/ 71576:
/***/ ((module) => {

module.exports = require("string_decoder");

/***/ }),

/***/ 24404:
/***/ ((module) => {

module.exports = require("tls");

/***/ }),

/***/ 76224:
/***/ ((module) => {

module.exports = require("tty");

/***/ }),

/***/ 57310:
/***/ ((module) => {

module.exports = require("url");

/***/ }),

/***/ 73837:
/***/ ((module) => {

module.exports = require("util");

/***/ }),

/***/ 59796:
/***/ ((module) => {

module.exports = require("zlib");

/***/ }),

/***/ 64108:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  headerHooks: () => (/* binding */ headerHooks),
  originalPathname: () => (/* binding */ originalPathname),
  requestAsyncStorage: () => (/* binding */ requestAsyncStorage),
  routeModule: () => (/* binding */ routeModule),
  serverHooks: () => (/* binding */ serverHooks),
  staticGenerationAsyncStorage: () => (/* binding */ staticGenerationAsyncStorage),
  staticGenerationBailout: () => (/* binding */ staticGenerationBailout)
});

// NAMESPACE OBJECT: ./app/api/gc_TTS_LA/route.ts
var route_namespaceObject = {};
__webpack_require__.r(route_namespaceObject);
__webpack_require__.d(route_namespaceObject, {
  POST: () => (POST)
});

// EXTERNAL MODULE: ./node_modules/next/dist/server/node-polyfill-headers.js
var node_polyfill_headers = __webpack_require__(36519);
// EXTERNAL MODULE: ./node_modules/next/dist/server/future/route-modules/app-route/module.js
var app_route_module = __webpack_require__(53488);
var module_default = /*#__PURE__*/__webpack_require__.n(app_route_module);
// EXTERNAL MODULE: ./node_modules/next/dist/server/web/exports/next-response.js
var next_response = __webpack_require__(12023);
;// CONCATENATED MODULE: ./app/api/gc_TTS_LA/route.ts
// TO IMPLEMENT IN THE FUTURE AS WE WON'T NEED LONG AUDIO FOR MVP
// might not be needed as most scripts should be only a couple pages (< 5000 bytes)
// this will only be needed if file is greater than 5000 bytes

// // Imports the Google Cloud client library
const textToSpeech = __webpack_require__(32061);
// Creates a client
const client = new textToSpeech.TextToSpeechLongAudioSynthesizeClient();
async function POST(request) {
    const res = await request.json();
    const number = Math.floor(Math.random() * 1000);
    const audioRequest = {
        parent: "projects/224518125313/locations/global",
        input: {
            text: res
        },
        // select the type of audio encoding
        audioConfig: {
            audioEncoding: "LINEAR16"
        },
        // this request is being saved in the google cloud 
        outputGcsUri: `gs://moby_test_bucket/long_audio${number}`,
        // Select the language and SSML voice gender (optional)
        voice: {
            name: "en-US-Neural2-I",
            languageCode: "en-US",
            ssmlGender: "MALE"
        }
    };
    // Performs the text-to-speech request
    // response is an object type Operations
    const [response] = await client.synthesizeLongAudio(audioRequest);
    // metadata.value holds a Buffer object (this could be of type LINEAR16)
    const longAudioData = response.latestResponse.metadata.value;
    return next_response/* default */.Z.json({
        buffer: longAudioData
    });
}

;// CONCATENATED MODULE: ./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?page=%2Fapi%2Fgc_TTS_LA%2Froute&name=app%2Fapi%2Fgc_TTS_LA%2Froute&pagePath=private-next-app-dir%2Fapi%2Fgc_TTS_LA%2Froute.ts&appDir=%2FUsers%2Fjinhoobong%2FDesktop%2FMoby%2Fmoby.team.github.io%2Fapp&appPaths=%2Fapi%2Fgc_TTS_LA%2Froute&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!

    

    

    

    const options = {"definition":{"kind":"APP_ROUTE","page":"/api/gc_TTS_LA/route","pathname":"/api/gc_TTS_LA","filename":"route","bundlePath":"app/api/gc_TTS_LA/route"},"resolvedPagePath":"/Users/jinhoobong/Desktop/Moby/moby.team.github.io/app/api/gc_TTS_LA/route.ts","nextConfigOutput":""}
    const routeModule = new (module_default())({
      ...options,
      userland: route_namespaceObject,
    })

    // Pull out the exports that we need to expose from the module. This should
    // be eliminated when we've moved the other routes to the new format. These
    // are used to hook into the route.
    const {
      requestAsyncStorage,
      staticGenerationAsyncStorage,
      serverHooks,
      headerHooks,
      staticGenerationBailout
    } = routeModule

    const originalPathname = "/api/gc_TTS_LA/route"

    

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [681,600,21,897,61], () => (__webpack_exec__(64108)));
module.exports = __webpack_exports__;

})();