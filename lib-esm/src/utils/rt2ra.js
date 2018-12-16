// import { parse } from 'node-html-parser';
// const parse = require('node-html-parser').parse;
import * as nhp from 'node-html-parser';
var parse = nhp.parse;
/**
 * Raw text to raw AST with node-html-parser library
 * @param rawText input string - text source file
 */
export function _rt2ra(rawText) {
    return parse("<doc>" + rawText + "</doc>", {
        lowerCaseTagName: false,
        pre: true,
        script: false,
        style: false,
    }).childNodes[0];
}
//# sourceMappingURL=rt2ra.js.map