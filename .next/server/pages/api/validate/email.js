"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/api/validate/email";
exports.ids = ["pages/api/validate/email"];
exports.modules = {

/***/ "(api)/./pages/api/validate/email.js":
/*!*************************************!*\
  !*** ./pages/api/validate/email.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ handler)\n/* harmony export */ });\nasync function handler(req, res) {\n    const { email } = req.query;\n    if (!email) return res.status(400).json({\n        error: \"Missing email\"\n    });\n    try {\n        const url = new URL(\"https://emailvalidation.abstractapi.com/v1/\");\n        url.searchParams.set(\"api_key\", process.env.ABSTRACT_EMAIL_API_KEY);\n        url.searchParams.set(\"email\", email);\n        const r = await fetch(url.toString());\n        const data = await r.json();\n        return res.status(r.ok ? 200 : r.status).json(data);\n    } catch (e) {\n        return res.status(500).json({\n            error: \"Email validation failed\"\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9wYWdlcy9hcGkvdmFsaWRhdGUvZW1haWwuanMiLCJtYXBwaW5ncyI6Ijs7OztBQUFlLGVBQWVBLFFBQVFDLEdBQUcsRUFBRUMsR0FBRztJQUM1QyxNQUFNLEVBQUVDLEtBQUssRUFBRSxHQUFHRixJQUFJRyxLQUFLO0lBQzNCLElBQUksQ0FBQ0QsT0FBTyxPQUFPRCxJQUFJRyxNQUFNLENBQUMsS0FBS0MsSUFBSSxDQUFDO1FBQUVDLE9BQU87SUFBZ0I7SUFFakUsSUFBSTtRQUNGLE1BQU1DLE1BQU0sSUFBSUMsSUFBSTtRQUNwQkQsSUFBSUUsWUFBWSxDQUFDQyxHQUFHLENBQUMsV0FBV0MsUUFBUUMsR0FBRyxDQUFDQyxzQkFBc0I7UUFDbEVOLElBQUlFLFlBQVksQ0FBQ0MsR0FBRyxDQUFDLFNBQVNSO1FBRTlCLE1BQU1ZLElBQUksTUFBTUMsTUFBTVIsSUFBSVMsUUFBUTtRQUNsQyxNQUFNQyxPQUFPLE1BQU1ILEVBQUVULElBQUk7UUFDekIsT0FBT0osSUFBSUcsTUFBTSxDQUFDVSxFQUFFSSxFQUFFLEdBQUcsTUFBTUosRUFBRVYsTUFBTSxFQUFFQyxJQUFJLENBQUNZO0lBQ2hELEVBQUUsT0FBT0UsR0FBRztRQUNWLE9BQU9sQixJQUFJRyxNQUFNLENBQUMsS0FBS0MsSUFBSSxDQUFDO1lBQUVDLE9BQU87UUFBMEI7SUFDakU7QUFDRiIsInNvdXJjZXMiOlsid2VicGFjazovL25leHRqcy1yZWR1eC11c2Vycy1wYWdpbmF0aW9uLy4vcGFnZXMvYXBpL3ZhbGlkYXRlL2VtYWlsLmpzPzhmNTgiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgYXN5bmMgZnVuY3Rpb24gaGFuZGxlcihyZXEsIHJlcykge1xuICBjb25zdCB7IGVtYWlsIH0gPSByZXEucXVlcnk7XG4gIGlmICghZW1haWwpIHJldHVybiByZXMuc3RhdHVzKDQwMCkuanNvbih7IGVycm9yOiBcIk1pc3NpbmcgZW1haWxcIiB9KTtcblxuICB0cnkge1xuICAgIGNvbnN0IHVybCA9IG5ldyBVUkwoXCJodHRwczovL2VtYWlsdmFsaWRhdGlvbi5hYnN0cmFjdGFwaS5jb20vdjEvXCIpO1xuICAgIHVybC5zZWFyY2hQYXJhbXMuc2V0KFwiYXBpX2tleVwiLCBwcm9jZXNzLmVudi5BQlNUUkFDVF9FTUFJTF9BUElfS0VZKTtcbiAgICB1cmwuc2VhcmNoUGFyYW1zLnNldChcImVtYWlsXCIsIGVtYWlsKTtcblxuICAgIGNvbnN0IHIgPSBhd2FpdCBmZXRjaCh1cmwudG9TdHJpbmcoKSk7XG4gICAgY29uc3QgZGF0YSA9IGF3YWl0IHIuanNvbigpO1xuICAgIHJldHVybiByZXMuc3RhdHVzKHIub2sgPyAyMDAgOiByLnN0YXR1cykuanNvbihkYXRhKTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIHJldHVybiByZXMuc3RhdHVzKDUwMCkuanNvbih7IGVycm9yOiBcIkVtYWlsIHZhbGlkYXRpb24gZmFpbGVkXCIgfSk7XG4gIH1cbn0iXSwibmFtZXMiOlsiaGFuZGxlciIsInJlcSIsInJlcyIsImVtYWlsIiwicXVlcnkiLCJzdGF0dXMiLCJqc29uIiwiZXJyb3IiLCJ1cmwiLCJVUkwiLCJzZWFyY2hQYXJhbXMiLCJzZXQiLCJwcm9jZXNzIiwiZW52IiwiQUJTVFJBQ1RfRU1BSUxfQVBJX0tFWSIsInIiLCJmZXRjaCIsInRvU3RyaW5nIiwiZGF0YSIsIm9rIiwiZSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(api)/./pages/api/validate/email.js\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("(api)/./pages/api/validate/email.js"));
module.exports = __webpack_exports__;

})();