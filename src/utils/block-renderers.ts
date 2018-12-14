import * as katex from 'katex';
import * as _ from 'lodash';
import * as showdown from 'showdown';

showdown.setOption('tables', true);
showdown.setOption('openLinksInNewWindow', true);
showdown.setOption('emoji', true);
showdown.setOption('strikethrough', true);

const converter = new showdown.Converter();

export function youtubeBlock(params: any) {
  return `<youtube-video id="${params.id}"></youtube-video>`;
}

export function imageBlock(params: any) {
  return `<single-image url="${params.src}" title="${params.title}" description="${
    params.description
  }"></single-image>`;
}

export function contentBoxBlock(attrs: any, inner: string) {
  return `<content-box classes="${attrs.class}"
                         heading="${attrs.title}">
      ${inner}
    </content-box>`;
}

export function hideShowBlock(attrs: any, inner: string) {
  return `<hide-show classes="${attrs.class}"
                       heading="${attrs.title}">
      ${inner}
    </hide-show>`;
}

export function textBlock(text: string) {
  const md = converter.makeHtml(text);

  /* const kat = _.replace(md, /\$\S([^\$\<\>"])*\S\$/g, e => {
    return katex.renderToString(_.trim(e, '$'), {throwOnError: false});
  }); */

  return md;
}

export function parseMaths(input: string) {
  const display = _.replace(input, /\$\$([^\$\<\>"])+\$\$/g, (e: string) => {
    return katex.renderToString(_.trim(e, '$'), {
      displayMode: true,
      throwOnError: false,
    } as any);
  });
  return _.replace(display, /\$\S([^\$\<\>"])*\S\$/g, (e: string) => {
    return katex.renderToString(_.trim(e, '$'), { throwOnError: false } as any);
  });
}

export function annotationBlock(annotated: string, annotationContent: any) {
  const annotatedAttr = _.escape(annotated);
  const annotationAttr = _.escape(JSON.stringify(annotationContent));

  return `<annotation-mark annotated="${annotatedAttr}" annotation="${annotationAttr}"></annotation-mark>`;
}
