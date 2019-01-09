import * as katex from 'katex';
import * as _ from 'lodash';
import * as showdown from 'showdown';

showdown.setOption('tables', true);
showdown.setOption('openLinksInNewWindow', true);
showdown.setOption('emoji', true);
showdown.setOption('strikethrough', true);

const converter = new showdown.Converter();

export function youtubeBlock(params: any) {
  return `<trko-youtube-video description="${params.description}" video-id="${
    params['video-id']
  }"></trko-youtube-video>`;
}

export function imageBlock(params: any) {
  return `<trko-image url="${params.url}" title="${params.title}" description="${params.description}"></trko-image>`;
}

export function contentBoxBlock(attrs: any, inner: string) {
  const id = 'bx-' + _.kebabCase(attrs.heading);

  return `<trko-box class="${attrs.class}" id="${id}" heading="${attrs.heading}">
      ${inner}
    </trko-box>`;
}

export function blockquoteBlock(attrs: any, inner: string) {
  // const id = 'bq-' + _.kebabCase(attrs.heading);

  return `<trko-blockquote
  class="${attrs.class}" 
  link="${attrs.link}"
  alignment="${attrs.alignment}"
  author="${attrs.author}">
      ${inner}
    </trko-blockquote>`;
}

export function hideShowBlock(attrs: any, inner: string) {
  const id = 'hs-' + _.kebabCase(attrs.heading);

  return `<trko-hide-show class="${attrs.class}" id="${id}" heading="${attrs.heading}" close="${attrs.close}">
      ${inner}
    </trko-hide-show>`;
}

export function textBlock(text: string) {
  const md = converter.makeHtml(text);

  /* const kat = _.replace(md, /\$\S([^\$\<\>"])*\S\$/g, e => {
    return katex.renderToString(_.trim(e, '$'), {throwOnError: false});
  }); */

  return md;
}

export function parseMaths(input: string) {
  let display = _.replace(input, /\$\$([^\$\<\>"])+\$\$/g, (e: string) => {
    return katex.renderToString(_.trim(e, '$'), {
      displayMode: true,
      throwOnError: false,
    } as any);
  });
  
  display = _.replace(display, /\$([^\$\<\>"])\$/g, (e: string) => {
    return katex.renderToString(_.trim(e, '$'), { throwOnError: false } as any);
  });

  return _.replace(display, /\$\S([^\$\<\>"])*\S\$/g, (e: string) => {
    return katex.renderToString(_.trim(e, '$'), { throwOnError: false } as any);
  });
}

export function annotationBlock(annotated: string, annotationContent: any) {
  const annotatedAttr = _.escape(annotated);
  const annotationAttr = _.escape(JSON.stringify(annotationContent));

  return `<trko-annotation annotated="${annotatedAttr}" annotation="${annotationAttr}"></trko-annotation>`;
}
