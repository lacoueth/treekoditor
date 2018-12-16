// import { toTipTapAst } from './step3_actions/embed-tiptap';
import { annotationBlock, contentBoxBlock, hideShowBlock, imageBlock, parseMaths, textBlock, youtubeBlock, } from './block-renderers';
export function preProcessTT(blockList) {
    return mergePlainsBlocks(processInlineBlocks(blockList));
}
export function renderTTBlock(block) {
    switch (block.type) {
        case 'doc':
            return renderTT(block.content);
        case 'text':
            return textBlock(block.text);
        case 'trko-youtube-video':
            return youtubeBlock(block.attrs);
        case 'trko-image':
            return imageBlock(block.attrs);
        case 'trko-box':
            return contentBoxBlock(block.attrs, renderTT(preProcessTT(block.content)));
        case 'trko-hide-show':
            return hideShowBlock(block.attrs, renderTT(preProcessTT(block.content)));
        default:
            return '';
    }
}
export function renderTT(blockList) {
    return blockList.map(function (block) { return renderTTBlock(block); }).join('');
}
export function processInlineBlocks(blockList) {
    return blockList.map(function (block) {
        switch (block.type) {
            case 'text':
                return {
                    text: parseMaths(block.text),
                    type: 'text',
                };
            case 'trko-annotation':
                return {
                    text: annotationBlock(parseMaths(block.attrs.an), parseMaths(renderTT(block.content))),
                    type: 'text',
                };
            default:
                return block;
        }
    });
}
export function mergePlainsBlocks(blockArray) {
    var res = [];
    var previousBlock = null;
    // for (let i = 0; i < blockArray.length; i++) {
    for (var _i = 0, blockArray_1 = blockArray; _i < blockArray_1.length; _i++) {
        var cur = blockArray_1[_i];
        var current = JSON.parse(JSON.stringify(cur));
        if (!!previousBlock && previousBlock.type === 'text') {
            if (current.type === 'text') {
                res[res.length - 1].text += current.text;
            }
            else {
                res.push(current);
            }
        }
        else {
            res.push(current);
        }
        previousBlock = current;
    }
    return res;
}
export function _ta2pa(input) {
    return {
        content: preProcessTT(input.content),
        type: 'doc',
    };
}
//# sourceMappingURL=ta2pa.js.map