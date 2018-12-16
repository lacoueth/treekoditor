import { ITTNode } from '../../models/ttAST.model';
export declare function preProcessTT(blockList: ITTNode[]): ITTNode[];
export declare function renderTTBlock(block: ITTNode): string;
export declare function renderTT(blockList: ITTNode[]): string;
export declare function processInlineBlocks(blockList: ITTNode[]): ITTNode[];
export declare function mergePlainsBlocks(blockArray: ITTNode[]): ITTNode[];
export declare function _ta2pa(input: ITTNode): ITTNode;
