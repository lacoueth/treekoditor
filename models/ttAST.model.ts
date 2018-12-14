/* export interface TTAST {
  type: 'doc';
  content: TTNode[];
}
 */
export interface ITTNode {
  type: string;
  attrs?: { [paramName: string]: string };
  text?: string;
  content?: ITTNode[];
}
