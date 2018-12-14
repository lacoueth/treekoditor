import { ITTNode } from '../../models/ttAST.model';

/**
 * Raw AST to TipTap AST
 * @param childnode
 */
export function _ra2ta(childnode: any): ITTNode {
  if (childnode.nodeType === 3) {
    return { type: 'text', text: childnode.rawText };
  }

  return {
    attrs: childnode.attributes,
    content: childnode.childNodes.map((e: any) => _ra2ta(e)),
    type: childnode.tagName || 'doc',
  };
}
