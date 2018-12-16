# Treekoditor

_Do not use this library it is currently in early development, there are not tests._

[Demo here](https://treekoditor.firebaseapp.com)

JS library to parse a mixture of Markdown and HTML. It has a support for TeX with KaTeX. Markdown is parsed with Showdown. The intermediate format is inspired by TipTap VueJS visual editor to allow later integration with it.

The library is used for example in `treekomponents`.

**You can control which HTML tags you want to allow and how to render them. You can then for example only allow Markdown and your custom elements.**

## The reason of the library

Markdown syntax is very easy but not infinitely extensible. You may want sometime to add a more richness to your text documents (more than blockquotes and code blocks).

A natural though is to include directly HTML tags in you Markdown text. But, when you put HTML tags in Markdown, the way it is parsed is not so previsible, especially when it comes to _original_ tags as the one you may use with custom elements.

The idea is then to build intermediate tree representation allowing to handle everything by hand or not. These intermediate trees can be also useful if you want to integrate later a visual editor.

## Installation

#### npm

`npm install --save treekoditor`

#### Script tag

```html
<script src="https://unpkg.com/treekoditor@latest/dist/index.min.js"></script>
```

## `rt2ra` : Raw text to raw AST (HTML AST)

This method only uses node-html-parser library. It parses HTML tags and text blocks that will be parsed later as Markdown.

```js
import { rt2ra } from 'treekoditor';

const rawText = 'Bonjour, <trko-annotation annotated="hello">"Bonjour" in english.</trko-annotation>.';
const rawAST = rt2ra(rawText);
```

Then `rawAST` will look like :

```js
{
    ...
}
```

## `ra2ta` : Raw AST to TipTap AST

This method simply maps the HTML resulting AST to a JSON object that has the model of TipTap document.

```js
...
import {ra2ta} from 'treekoditor';

const rawAST = rt2ra(TEXT);
const tiptapAST = ra2ta(rawAST);
```

With the previous example input, `tiptapAST` const will look like :

```js
{
    type: 'doc',
    content: [
        {
            type: 'text',
            text: 'Bonjour, '
        },
        {
            type: 'trko-annotation',
            attrs: {
                annotated: 'hello'
            },
            content: [
                {
                    type: 'text',
                    text: '"Bonjour" in english.'
                }
            ]
        }
    ]
}
```

## `ta2pa` : TipTap AST to processed AST

This step in necessary before Markdown parsing as `<space>`, `\n` or `\t` are significant in this syntax. We then need to process the TipTap AST to handle a good render for inline blocks/ For example : the `trko-annotation` node have to be rendered inline to be integrated well in Markdown rendering.

Thus, inline blocks are serialized at this step and merged into text blocks.

```js
...
import {ta2pa} from 'treekoditor';

const tiptapAST = ra2ta(rt2ra(TEXT));
const processedAST = ta2pa(tiptapAST);
```

We get :

```js
{
    type: 'doc',
    content: [
        {
            type: 'text',
            text: 'Bonjour, <trko-annotation annotated="hello" annotation="\{type:\"text\",text:\"\"Bonjour\" in english.\"\}"></trko-annotation>'
        }
    ]
}
```

Here the content of the annotation block is stringified, escaped and passed as an attribute to be later handled separately by the custom element.

## `pa2rh` : Processed AST to "renderable" HTML

This step will parse Markdown and KaTeX. It will return a plain HTML that can be rendered in the browser.

```js
...
import {pa2rh} from 'treekoditor';

const processedAST = ta2pa(ra2ta(rt2ra(TEXT)));
const readyHTML = pa2rh(processedAST);
```

You need to import in your global app your custom elements to let them render.
