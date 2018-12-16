/**
 * Raw AST to TipTap AST
 * @param childnode
 */
export function _ra2ta(childnode) {
    if (childnode.nodeType === 3) {
        return { type: 'text', text: childnode.rawText };
    }
    return {
        attrs: childnode.attributes,
        content: childnode.childNodes.map(function (e) { return _ra2ta(e); }),
        type: childnode.tagName || 'doc',
    };
}
//# sourceMappingURL=ra2ta.js.map