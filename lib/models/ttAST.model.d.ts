export interface ITTNode {
    type: string;
    attrs?: {
        [paramName: string]: string;
    };
    text?: string;
    content?: ITTNode[];
}
