// MIT © 2017 azu
"use strict";
/* Example
{
    "position": {
        "start": {"line": 145, "column": 33, "offset": 225231},
        "end": {"line": 145, "column": 37, "offset": 225235}
    },
    "annotation": {
        "id": 5,
        "annotator_schema_version": "v1.0",
        "text": "初回は--debugオプションの短縮形であると書いたほうが分かりやすいかも\n(以下にもデバッグ時に使うぞって感じ)\nhttps://github.com/substack/node-browserify",
        "quote": "-dオプションによるものです",
        "ranges": [{"end": "/p[28]", "endOffset": 44, "start": "/p[28]/code[2]", "startOffset": 0}],
        "uri": "http://localhost:9080/static/review/index.html",
        "filePath": "/path/to/test.md"
    }
}
*/
/**
 * @typedef {object} MarkdownReviewData
 * @property {{
 *   start: {line: number, column: number, offset: number},
 *   end: {line: number, column: number, offset: number}}
 * } position
 * @property {AnnotationData} annotation
 */

/**
 * @typedef {object} AnnotationData
 * @property {string} id
 * @property {string} text
 * @property {string} quote
 * @property {{end: number, endOffset: number, start: number, startOffset: number}} ranges
 * HTML range(not markdown range)
 * @property {string} annotator_schema_version
 * @property {string} uri
 * @property {string} filePath
 */
const fs = require("fs");
/**
 * @param {MarkdownReviewData} markdownReviewData
 * @param {Object} options
 */
module.exports = function(markdownReviewData, options = {}) {
    if (!markdownReviewData.annotation.filePath) {
        return void console.log(markdownReviewData, "no valid");
    }
    const content = fs.readFileSync(markdownReviewData.annotation.filePath, "utf-8");
    const lines = content.split("\n");
    // startとendが同じ行となることがある
    const startLine = markdownReviewData.position.start.line - 1;
    const endLine = markdownReviewData.position.end.line;
    const refLines = lines.slice(startLine, endLine);
    const refURL = markdownReviewData.annotation.filePath.replace(options.fromPath, options.toPath);
    const refText = refLines.map(line => {
        return `> ${line}`;
    }).join("\n");
    const quoteText = markdownReviewData.annotation.quote;
    const annotationText = markdownReviewData.annotation.text;

    const reviewContent = `${refText}
> -- ${refURL}

----

> ${quoteText}

${annotationText}
`;
    return reviewContent;

};