"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var katex = require("katex");
var _ = require("lodash");
var showdown = require("showdown");
showdown.setOption('tables', true);
showdown.setOption('openLinksInNewWindow', true);
showdown.setOption('emoji', true);
showdown.setOption('strikethrough', true);
var converter = new showdown.Converter();
function youtubeBlock(params) {
    return "<trko-youtube-video video-id=\"" + params['video-id'] + "\"></trko-youtube-video>";
}
exports.youtubeBlock = youtubeBlock;
function imageBlock(params) {
    return "<trko-image url=\"" + params.url + "\" title=\"" + params.title + "\" description=\"" + params.description + "\"></trko-image>";
}
exports.imageBlock = imageBlock;
function contentBoxBlock(attrs, inner) {
    var id = 'bx-' + _.kebabCase(attrs.heading);
    return "<trko-box class=\"" + attrs.class + "\" id=\"" + id + "\" heading=\"" + attrs.heading + "\">\n      " + inner + "\n    </trko-box>";
}
exports.contentBoxBlock = contentBoxBlock;
function hideShowBlock(attrs, inner) {
    var id = 'hs-' + _.kebabCase(attrs.heading);
    return "<trko-hide-show class=\"" + attrs.class + "\" id=\"" + id + "\" heading=\"" + attrs.heading + "\">\n      " + inner + "\n    </trko-hide-show>";
}
exports.hideShowBlock = hideShowBlock;
function textBlock(text) {
    var md = converter.makeHtml(text);
    /* const kat = _.replace(md, /\$\S([^\$\<\>"])*\S\$/g, e => {
      return katex.renderToString(_.trim(e, '$'), {throwOnError: false});
    }); */
    return md;
}
exports.textBlock = textBlock;
function parseMaths(input) {
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
exports.parseMaths = parseMaths;
function annotationBlock(annotated, annotationContent) {
    var annotatedAttr = _.escape(annotated);
    var annotationAttr = _.escape(JSON.stringify(annotationContent));
    return "<trko-annotation annotated=\"" + annotatedAttr + "\" annotation=\"" + annotationAttr + "\"></trko-annotation>";
}
exports.annotationBlock = annotationBlock;
//# sourceMappingURL=block-renderers.js.map