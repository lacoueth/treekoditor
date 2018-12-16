import * as katex from 'katex';
import * as _ from 'lodash';
import * as showdown from 'showdown';
showdown.setOption('tables', true);
showdown.setOption('openLinksInNewWindow', true);
showdown.setOption('emoji', true);
showdown.setOption('strikethrough', true);
var converter = new showdown.Converter();
export function youtubeBlock(params) {
    return "<trko-youtube-video video-id=\"" + params['video-id'] + "\"></trko-youtube-video>";
}
export function imageBlock(params) {
    return "<trko-image url=\"" + params.url + "\" title=\"" + params.title + "\" description=\"" + params.description + "\"></trko-image>";
}
export function contentBoxBlock(attrs, inner) {
    var id = 'bx-' + _.kebabCase(attrs.heading);
    return "<trko-box class=\"" + attrs.class + "\" id=\"" + id + "\" heading=\"" + attrs.heading + "\">\n      " + inner + "\n    </trko-box>";
}
export function hideShowBlock(attrs, inner) {
    var id = 'hs-' + _.kebabCase(attrs.heading);
    return "<trko-hide-show class=\"" + attrs.class + "\" id=\"" + id + "\" heading=\"" + attrs.heading + "\">\n      " + inner + "\n    </trko-hide-show>";
}
export function textBlock(text) {
    var md = converter.makeHtml(text);
    /* const kat = _.replace(md, /\$\S([^\$\<\>"])*\S\$/g, e => {
      return katex.renderToString(_.trim(e, '$'), {throwOnError: false});
    }); */
    return md;
}
export function parseMaths(input) {
    var display = _.replace(input, /\$\$([^\$\<\>"])+\$\$/g, function (e) {
        return katex.renderToString(_.trim(e, '$'), {
            displayMode: true,
            throwOnError: false,
        });
    });
    return _.replace(display, /\$\S([^\$\<\>"])*\S\$/g, function (e) {
        return katex.renderToString(_.trim(e, '$'), { throwOnError: false });
    });
}
export function annotationBlock(annotated, annotationContent) {
    var annotatedAttr = _.escape(annotated);
    var annotationAttr = _.escape(JSON.stringify(annotationContent));
    return "<trko-annotation annotated=\"" + annotatedAttr + "\" annotation=\"" + annotationAttr + "\"></trko-annotation>";
}
//# sourceMappingURL=block-renderers.js.map