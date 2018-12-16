"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import { toTipTapAst } from './step3_actions/embed-tiptap';
var block_renderers_1 = require("./block-renderers");
function preProcessTT(blockList) {
    return mergePlainsBlocks(processInlineBlocks(blockList));
}
exports.preProcessTT = preProcessTT;
function renderTTBlock(block) {
    switch (block.type) {
        case 'doc':
            return renderTT(block.content);
        case 'text':
            return block_renderers_1.textBlock(block.text);
        case 'trko-youtube-video':
            return block_renderers_1.youtubeBlock(block.attrs);
        case 'trko-image':
            return block_renderers_1.imageBlock(block.attrs);
        case 'trko-box':
            return block_renderers_1.contentBoxBlock(block.attrs, renderTT(preProcessTT(block.content)));
        case 'trko-hide-show':
            return block_renderers_1.hideShowBlock(block.attrs, renderTT(preProcessTT(block.content)));
        default:
            return '';
    }
}
exports.renderTTBlock = renderTTBlock;
function renderTT(blockList) {
    return blockList.map(function (block) { return renderTTBlock(block); }).join('');
}
exports.renderTT = renderTT;
function processInlineBlocks(blockList) {
    return blockList.map(function (block) {
        switch (block.type) {
            case 'text':
                return {
                    text: block_renderers_1.parseMaths(block.text),
                    type: 'text',
                };
            case 'trko-annotation':
                return {
                    text: block_renderers_1.annotationBlock(block_renderers_1.parseMaths(block.attrs.an), block_renderers_1.parseMaths(renderTT(block.content))),
                    type: 'text',
                };
            default:
                return block;
        }
    });
}
exports.processInlineBlocks = processInlineBlocks;
function mergePlainsBlocks(blockArray) {
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
exports.mergePlainsBlocks = mergePlainsBlocks;
function _ta2pa(input) {
    return {
        content: preProcessTT(input.content),
        type: 'doc',
    };
}
exports._ta2pa = _ta2pa;
//# sourceMappingURL=ta2pa.js.map