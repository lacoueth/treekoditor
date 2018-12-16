"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import { parse } from 'node-html-parser';
// const parse = require('node-html-parser').parse;
var nhp = require("node-html-parser");
var parse = nhp.parse;
/**
 * Raw text to raw AST with node-html-parser library
 * @param rawText input string - text source file
 */
function _rt2ra(rawText) {
    return parse("<doc>" + rawText + "</doc>", {
        lowerCaseTagName: false,
        pre: true,
        script: false,
        style: false,
    }).childNodes[0];
}
exports._rt2ra = _rt2ra;
//# sourceMappingURL=rt2ra.js.map