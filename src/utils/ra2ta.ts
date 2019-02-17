import { ITTNode } from '../../models/ttAST.model';

import * as _ from 'lodash';

/**
 * Raw AST to TipTap AST
 * @param childnode
 */
export function _ra2ta(childnode: any): ITTNode {
  if (childnode.nodeType === 3) {
    return { type: 'text', text: childnode.rawText };
  }

  if (childnode.tagName === 'code') {
    const startLength = `<code${childnode.rawAttrs ? ' ' + childnode.rawAttrs : ''}>\n`.length;
    const endLength = '\n</code>'.length;
    const length = childnode.outerHTML.length;
    const content = childnode.outerHTML.substring(startLength, length - endLength);
    return {
      attrs: childnode.attributes,
      text: content,
      type: 'code',
    };
  }

  return {
    attrs: childnode.attributes,
    content: childnode.childNodes.map((e: any) => _ra2ta(e)),
    type: childnode.tagName || 'doc',
  };
}
