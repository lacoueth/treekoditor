/**
 * Serialize TipTap AST to raw text
 * @param node TipTap AST document node (root node)
 */
export function _ta2rt(node) {
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
//# sourceMappingURL=ta2rt.js.map