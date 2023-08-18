"use strict";
(() => {
var exports = {};
exports.id = 197;
exports.ids = [197];
exports.modules = {

/***/ 39491:
/***/ ((module) => {

module.exports = require("assert");

/***/ }),

/***/ 57147:
/***/ ((module) => {

module.exports = require("fs");

/***/ }),

/***/ 13685:
/***/ ((module) => {

module.exports = require("http");

/***/ }),

/***/ 95687:
/***/ ((module) => {

module.exports = require("https");

/***/ }),

/***/ 22037:
/***/ ((module) => {

module.exports = require("os");

/***/ }),

/***/ 71017:
/***/ ((module) => {

module.exports = require("path");

/***/ }),

/***/ 12781:
/***/ ((module) => {

module.exports = require("stream");

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

/***/ 43036:
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

// NAMESPACE OBJECT: ./app/api/openAI_GPT/route.ts
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
;// CONCATENATED MODULE: ./app/api/openAI_GPT/route.ts

// requiring the open ai package
const { Configuration, OpenAIApi } = __webpack_require__(16535);
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
});
const openai = new OpenAIApi(configuration);
async function POST(request) {
    const res = await request.json();
    console.log("input ", JSON.stringify(res));
    const model = "gpt-3.5-turbo";
    const messages = [
        {
            role: "user",
            content: `Given an array of objects representing a movie script containing character names, their corresponding lines, and scene actions, parse it using the following format. Transform objects with the type value "CHARACTER_BLOCK" into individual objects with "name" and "line" as its keys, such that an object will have two key value pairs. Character names and their lines should be separated correctly, even when a character name appears within a line. Please double check even triple check to make sure that no character names are found within a line. Words that are in all caps are character names. Replace the objects with the type "CHARACTER_BLOCK" in the original array with these newly created objects and return the original array. Make sure that character names are accurately separated from their lines, and that the transformation preservers the order of objects in the original array. Please use the following array and return the transformed array as the result not a function on how to do it. ${JSON.stringify(res)}`
        }
    ];
    const response = await openai.createChatCompletion({
        model: model,
        messages: messages
    });
    const responseObj = JSON.parse(response.data.choices[0].message.content);
    return next_response/* default */.Z.json({
        dialogueScript: responseObj
    });
} /* 

Prompts we've tried: 

Given an array of objects representing a movie script containing character names, their corresponding lines, and scene actions, parse it using the following format. Transform objects with the type value "CHARACTER_BLOCK" into new objects with "name" and "line" as keys. Character names and their lines should be separated correctly, even when a character name appears within a line. Words that are in all caps are character names. Replace the objects with the type "CHARACTER_BLOCK" in the original array with these newly created objects and return the original array. Make sure that character names are accurately separated from their lines, and that the transformation preserves the order of objects in the original array. Use the given array of objects and provide the transformed array as the result.

Given an array of objects representing a movie script containing character names, their corresponding lines, and scene actions, parse it using the following format. Transform objects with the type value "CHARACTER_BLOCK" into new objects with "name" and "line" as keys. Character names and their lines should be separated correctly, even when a character name appears within a line. Please double check even triple check to make sure that no character names are found within a line. Words that are in all caps are character names. Replace the objects with the type "CHARACTER_BLOCK" in the original array with these newly created objects and return the original array. Make sure that character names are accurately separated from their lines, and that the transformation preservers the order of objects in the original array. Please use the following array and return the transformed array as the result.

Please transform the given array of objects representing a movie script into a new format while accurately separating character names and their corresponding lines. The array contains objects with different types, including "CHARACTER_BLOCK" and "SCENE_ACTION". The transformation should correctly identify character names in all capital letters and differentiate them from their lines. Make sure to handle cases where character names appear within lines. Here are the steps to follow: 1.For each object in the array: If the object's type is "CHARACTER_BLOCK": Split the text by newlines to separate character names and lines. Identify character names (in all caps) and their corresponding lines. Create new objects for each character with the keys "name" and "line". Ensure that character names and lines are correctly separated, even when names appear within lines.Replace the original "CHARACTER_BLOCK" object with the newly created objects.If the object's type is "SCENE_ACTION", keep it unchanged. 2. Return the array with the transformed format. Please ensure that the transformation preserves the original order of objects in the array and accurately separates character names from their lines, even when character names are embedded within lines.

{ role: 'system', content: 'You are parsing a movie script that includes character names, their corresponding lines, and scene actions.' },
 role: 'user' , content: 'For objects with the type "CHARACTER_BLOCK", separate its text value into an object with key value pairs using name and line as keys, and the characters name and their lines as corresponding values respectively. If names repeat, do not identify as new characters. ' },
{ role: 'user', content: 'Replace the CHARACTER BLOCK objects in the original json string with the newly created objects. And return that string in a JSON object. Please use the following script.' },
{ role: 'user', content: "Given a movie script containing character names, their corresponding lines, and scene actions, process the script as follows: For each element with the type 'CHARACTER_BLOCK,' create a new object using 'name' and 'line' as keys. Keep in mind there could be multiple characters in the element. Assign the character's name to the 'name' key and their lines to the 'line' key. If character names are repeated, do not treat them as new characters. Replace the 'CHARACTER_BLOCK' elements in the original JSON string with these newly created objects. Provide the modified JSON string within a JSON object." },
{ role: 'user', content: 'Given a movie script containing character names, their corresponding lines, and scene actions, I would like you to parse it in the following format' },
{ role: 'user', content: 'Given an array of objects that represent a movie script containing character names, their corresponding lines, and scene actions, I would like you to parse it in the following format' },
{ role: 'user', content: 'Break only objects with type CHARACTER_BLOCK into new objects with key value pairs where "name" and "line" are keys, and the characters names and their lines are the values respectively. All words that are in all caps are character names. Return this to me in a JSON object.' },
{ role: 'user', content: 'Break only objects with type CHARACTER_BLOCK into new objects with key value pairs where "name" and "line" are keys, and the characters names and their lines are the values respectively. All words that are in all caps are character names. Return this to me in a JSON object and return only the JSON object.' },
{ role: 'user', content: 'Break only objects that have type value CHARACTER_BLOCK into new objects with key value pairs where "name" and "line" are keys, and the characters names and their lines are the values respectively. Words that are in all caps are character names so make sure to separate those accordingly. Replace the object with type CHARACTER_BLOCK with this newly created object and return the original array.' },
{ role: 'user', content: `Given an array of objects representing a movie script containing character names, their corresponding lines, and scene actions, parse it using the following format. Transform objects with the type value "CHARACTER_BLOCK" into new objects with "name" and "line" as keys. Character names and their lines should be separated correctly, even when a character name appears within a line. WOrds that are in all caps are character names. Replace the objects with the type "CHARACTER_BLOCK" in the original array with these newly created objects and return the original array. Make sure that character names are accurately separated from their lines, and that the transformation preservers the order of objects in the original array. Please use the following array and return the transformed array as the result. ${JSON.stringify(res)}`}

*/ 

;// CONCATENATED MODULE: ./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?page=%2Fapi%2FopenAI_GPT%2Froute&name=app%2Fapi%2FopenAI_GPT%2Froute&pagePath=private-next-app-dir%2Fapi%2FopenAI_GPT%2Froute.ts&appDir=%2FUsers%2Fjinhoobong%2FDesktop%2FMoby%2Fmoby.team.github.io%2Fapp&appPaths=%2Fapi%2FopenAI_GPT%2Froute&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&basePath=&assetPrefix=&nextConfigOutput=export&preferredRegion=&middlewareConfig=e30%3D!

    

    

    

    const options = {"definition":{"kind":"APP_ROUTE","page":"/api/openAI_GPT/route","pathname":"/api/openAI_GPT","filename":"route","bundlePath":"app/api/openAI_GPT/route"},"resolvedPagePath":"/Users/jinhoobong/Desktop/Moby/moby.team.github.io/app/api/openAI_GPT/route.ts","nextConfigOutput":"export"}
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

    const originalPathname = "/api/openAI_GPT/route"

    

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [681,600,21,535], () => (__webpack_exec__(43036)));
module.exports = __webpack_exports__;

})();