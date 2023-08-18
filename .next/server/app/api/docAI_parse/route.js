"use strict";
(() => {
var exports = {};
exports.id = 928;
exports.ids = [928];
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

/***/ 90761:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   headerHooks: () => (/* binding */ headerHooks),
/* harmony export */   originalPathname: () => (/* binding */ originalPathname),
/* harmony export */   requestAsyncStorage: () => (/* binding */ requestAsyncStorage),
/* harmony export */   routeModule: () => (/* binding */ routeModule),
/* harmony export */   serverHooks: () => (/* binding */ serverHooks),
/* harmony export */   staticGenerationAsyncStorage: () => (/* binding */ staticGenerationAsyncStorage),
/* harmony export */   staticGenerationBailout: () => (/* binding */ staticGenerationBailout)
/* harmony export */ });
/* harmony import */ var next_dist_server_node_polyfill_headers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(36519);
/* harmony import */ var next_dist_server_node_polyfill_headers__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_node_polyfill_headers__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_dist_server_future_route_modules_app_route_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(53488);
/* harmony import */ var next_dist_server_future_route_modules_app_route_module__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_future_route_modules_app_route_module__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Users_jinhoobong_Desktop_Moby_moby_team_github_io_app_api_docAI_parse_route_ts__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(91165);

    

    

    

    const options = {"definition":{"kind":"APP_ROUTE","page":"/api/docAI_parse/route","pathname":"/api/docAI_parse","filename":"route","bundlePath":"app/api/docAI_parse/route"},"resolvedPagePath":"/Users/jinhoobong/Desktop/Moby/moby.team.github.io/app/api/docAI_parse/route.ts","nextConfigOutput":"export"}
    const routeModule = new (next_dist_server_future_route_modules_app_route_module__WEBPACK_IMPORTED_MODULE_1___default())({
      ...options,
      userland: _Users_jinhoobong_Desktop_Moby_moby_team_github_io_app_api_docAI_parse_route_ts__WEBPACK_IMPORTED_MODULE_2__,
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

    const originalPathname = "/api/docAI_parse/route"

    

/***/ }),

/***/ 91165:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   POST: () => (/* binding */ POST)
/* harmony export */ });
/* harmony import */ var next_dist_server_web_exports_next_response__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12023);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(71017);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_1__);


const projectId = "moby-project-393418";
const location_gc = "us"; // Format is 'us' or 'eu'
// const processorId = 'afbbb298ff2f34d6'; // this is our previous default Doc Parser processor ID 
// const processorId = '5fb25a11187fecdb'; // this is our custom processor ID  with Workbench - this returns CHARACTER_NAME, LINES, & SCENE_ACTIONS
const processorId = "f1d9c2d96304cda5" // this is our custom processir v2 ID with Workbench - this returns CHARACTER_BLOCKS & SCENE_ACTIONS
;
const { DocumentProcessorServiceClient } = (__webpack_require__(99718).v1);
// Instantiates a client
// apiEndpoint regions available: eu-documentai.googleapis.com, us-documentai.googleapis.com (Required if using eu based processor)
const client = new DocumentProcessorServiceClient();
// export async function POST(request: NextRequest) {
//     // The full resource name of the processor, e.g.:
//     // projects/project-id/locations/location/processor/processor-id
//     // You must create new processors in the Cloud Console first
//     const name = `projects/${projectId}/locations/${location_gc}/processors/${processorId}`;
//     // Read the file into memory.
//     const fs = require('fs').promises;
//     const res = await request.json();
//     // TODO: once we have a cloud storage set up to store our scripts - we'll need to point it to here 
//         // this will be where we can identify whether we need to actually send the document or just pull from the storage 
//     const filePath = `/Users/jinhoobong/Desktop/ScenePartner_AI/ScenePartnerAI/public/uploads/${res}`;
//     // const filePath = `/Users/janeyou/Coding/JJA/ScenePartnerAI/public/uploads/${res}`;
//     const imageFile = await fs.readFile(filePath);
//     // Convert the image data to a Buffer and base64 encode it.
//     const encodedImage = Buffer.from(imageFile).toString('base64');
//     const request_gc = {
//         name,
//         rawDocument: {
//         content: encodedImage,
//         mimeType: 'application/pdf',
//         },
//     };
//     // Recognizes text entities in the PDF document
//     const [ result ] = await client.processDocument(request_gc);
//     const { document } = result;
//     const entities = document.entities;
//     // array to store the object with extracted necessary info
//     const destructuredEntities = [];
//     // we're extracting the necessary information from the response from Google DocAI 
//     entities.forEach((entity) => {
//         const entityInfo = {
//             type: entity.type,
//             text: entity.mentionText,
//             position: entity.pageAnchor.pageRefs[0].boundingPoly.normalizedVertices[0]
//         }
//         destructuredEntities.push(entityInfo);
//     })
//     // function to help sort the objects 
//     const sortByVertical = (object) => {
//         return object.position.y;
//     }
//     // sort by vertical position 
//     destructuredEntities.sort((a, b) => sortByVertical(a) - sortByVertical(b));
//     return NextResponse.json({ scriptObjects: destructuredEntities });
// }
async function POST(request) {
    // grab the file name
    const res = await request.json();
    console.log("waht is res", res);
    const fs = (__webpack_require__(57147).promises);
    //Find the absolute path of the json directory
    const jsonDirectory = path__WEBPACK_IMPORTED_MODULE_1___default().join(process.cwd(), "assets");
    if (res.includes("White-Room")) {
        const fileContents = await fs.readFile(jsonDirectory + "/white_room.json", "utf8");
        const scriptObjects = eval(fileContents);
        return next_dist_server_web_exports_next_response__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .Z.json({
            scriptObjects: scriptObjects
        });
    }
    if (res.includes("Risk-Management")) {
        const fileContents = await fs.readFile(jsonDirectory + "/risk_management.json", "utf8");
        const scriptObjects = eval(fileContents);
        return next_dist_server_web_exports_next_response__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .Z.json({
            scriptObjects: scriptObjects
        });
    }
    return next_dist_server_web_exports_next_response__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .Z.json({
        scriptObjects: ""
    });
}


/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [681,600,21,897,718], () => (__webpack_exec__(90761)));
module.exports = __webpack_exports__;

})();