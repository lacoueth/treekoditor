import * as _ from 'lodash';
import { ITTNode } from '../../models/ttAST.model';
// import { toTipTapAst } from './step3_actions/embed-tiptap';
import {
  annotationBlock,
  blockquoteBlock,
  contentBoxBlock,
  hideShowBlock,
  imageBlock,
  parseMaths,
  textBlock,
  youtubeBlock,
  ytLightBlock,
} from './block-renderers';

export function preProcessTT(blockList: ITTNode[]): ITTNode[] {
  return mergePlainsBlocks(processInlineBlocks(blockList));
}

export function renderTTBlock(block: ITTNode): string {
  switch (block.type) {
    case 'doc':
      return renderTT(block.content!);
    case 'text':
      return textBlock(block.text!);
    case 'trko-youtube-video':
      return youtubeBlock(block.attrs);
    case 'trko-yt-light':
      return ytLightBlock(block.attrs);
    case 'trko-image':
      return imageBlock(block.attrs, renderTT(preProcessTT(block.content!)));
    case 'trko-box':
      return contentBoxBlock(block.attrs, renderTT(preProcessTT(block.content!)));
    case 'trko-blockquote':
      return blockquoteBlock(block.attrs, renderTT(preProcessTT(block.content!)));
    case 'trko-hide-show':
      return hideShowBlock(block.attrs, renderTT(preProcessTT(block.content!)));
    case 'code':
      return `<pre><code>${_.escape(block.text!)}</code></pre>`;
    default:
      return '';
  }
}

export function renderTT(blockList: ITTNode[]): string {
  return blockList.map(block => renderTTBlock(block)).join('');
}

export function processInlineBlocks(blockList: ITTNode[]): ITTNode[] {
  return blockList.map(block => {
    switch (block.type) {
      case 'text':
        return {
          text: parseMaths(block.text!),
          type: 'text',
        };
      case 'trko-annotation':
        return {
          text: annotationBlock(parseMaths(block.attrs!.annotated), parseMaths(renderTT(block.content!))),
          type: 'text',
        };
      default:
        return block;
    }
  });
}

export function mergePlainsBlocks(blockArray: ITTNode[]): ITTNode[] {
  const res = [];
  let previousBlock = null;

  // for (let i = 0; i < blockArray.length; i++) {
  for (const cur of blockArray) {
    const current = JSON.parse(JSON.stringify(cur));
    if (!!previousBlock && previousBlock.type === 'text') {
      if (current.type === 'text') {
        res[res.length - 1].text += current.text;
      } else {
        res.push(current);
      }
    } else {
      res.push(current);
    }
    previousBlock = current;
  }
  return res;
}

export function _ta2pa(input: ITTNode): ITTNode {
  return {
    content: preProcessTT(input.content!),
    type: 'doc',
  };
}
