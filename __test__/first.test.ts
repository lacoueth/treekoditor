import { _ra2ta } from '../src/utils/ra2ta';

test('First', () => {
  const rawAST = {
    nodeType: 3,
    rawText: 'bonjour',
  };

  const tiptapAST = {
    text: 'bonjour',
    type: 'text',
  };

  expect(_ra2ta(rawAST)).toEqual(tiptapAST);
});
