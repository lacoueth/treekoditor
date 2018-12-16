"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Serialize TipTap AST to raw text
 * @param node TipTap AST document node (root node)
 */
function _ta2rt(node) {
    function serializeAttrs(attrs) {
        return Object.keys(attrs).reduce(function (a, c) { return a + " " + c + "=\"" + attrs[c] + "\""; }, '');
    }
    if (node.type === 'doc') {
        return node.content.reduce(function (e, c) { return e + _ta2rt(c); }, '');
    }
    if (node.type === 'text') {
        return node.text;
    }
    return ("<" + node.type + (node.attrs ? serializeAttrs(node.attrs) : '') + ">" +
        node.content.reduce(function (e, c) { return e + _ta2rt(c); }, '') +
        ("</" + node.type + ">"));
}
exports._ta2rt = _ta2rt;
//# sourceMappingURL=ta2rt.js.map