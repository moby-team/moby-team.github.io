"use strict";
(() => {
var exports = {};
exports.id = 998;
exports.ids = [998];
exports.modules = {

/***/ 22037:
/***/ ((module) => {

module.exports = require("os");

/***/ }),

/***/ 71017:
/***/ ((module) => {

module.exports = require("path");

/***/ }),

/***/ 756:
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

// NAMESPACE OBJECT: ./app/api/upload/route.ts
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
;// CONCATENATED MODULE: external "fs/promises"
const promises_namespaceObject = require("fs/promises");
// EXTERNAL MODULE: ./node_modules/next/dist/server/web/exports/next-response.js
var next_response = __webpack_require__(12023);
// EXTERNAL MODULE: ./node_modules/mime/index.js
var mime = __webpack_require__(35058);
var mime_default = /*#__PURE__*/__webpack_require__.n(mime);
// EXTERNAL MODULE: external "path"
var external_path_ = __webpack_require__(71017);
;// CONCATENATED MODULE: ./app/api/upload/route.ts




/* TODO: check to see if the file being uploaded already exists - if it does,
we want to avoid adding it into the DB */ async function POST(request) {
    const formData = await request.formData();
    const file = formData.get("file");
    if (!file) {
        return next_response/* default */.Z.json({
            error: "File blob is required."
        }, {
            status: 400
        });
    }
    const buffer = Buffer.from(await file.arrayBuffer());
    // this points to our folder and the directory to which we'd upload
    const relativeUploadDir = `/uploads/`;
    const uploadDir = (0,external_path_.join)(process.cwd(), "public", relativeUploadDir);
    try {
        await (0,promises_namespaceObject.stat)(uploadDir);
    } catch (e) {
        if (e.code === "ENOENT") {
            await (0,promises_namespaceObject.mkdir)(uploadDir, {
                recursive: true
            });
        } else {
            console.error("Error while trying to create directory when uploading a file\n", e);
            return next_response/* default */.Z.json({
                error: "Something went wrong."
            }, {
                status: 500
            });
        }
    }
    try {
        const filename = `${file.name.replace(/\.[^/.]+$/, "")}.${mime_default().getExtension(file.type)}`;
        // this is writing to the file 
        await (0,promises_namespaceObject.writeFile)(`${uploadDir}/${filename}`, buffer);
        return next_response/* default */.Z.json({
            status: 200
        });
    } catch (e) {
        console.error("Error while trying to upload a file\n", e);
        return next_response/* default */.Z.json({
            error: "Something went wrong."
        }, {
            status: 500
        });
    }
}

;// CONCATENATED MODULE: ./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?page=%2Fapi%2Fupload%2Froute&name=app%2Fapi%2Fupload%2Froute&pagePath=private-next-app-dir%2Fapi%2Fupload%2Froute.ts&appDir=%2FUsers%2Fjinhoobong%2FDesktop%2FMoby%2Fmoby.team.github.io%2Fapp&appPaths=%2Fapi%2Fupload%2Froute&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!

    

    

    

    const options = {"definition":{"kind":"APP_ROUTE","page":"/api/upload/route","pathname":"/api/upload","filename":"route","bundlePath":"app/api/upload/route"},"resolvedPagePath":"/Users/jinhoobong/Desktop/Moby/moby.team.github.io/app/api/upload/route.ts","nextConfigOutput":""}
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

    const originalPathname = "/api/upload/route"

    

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [681,600,58], () => (__webpack_exec__(756)));
module.exports = __webpack_exports__;

})();