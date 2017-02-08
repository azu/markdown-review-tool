"use strict";
/* eslint-env mocha */
const assert = require("assert");
const path = require("path");
const reviewToIssue = require("../lib/markdown-review-to-issue");
describe("reviewToIssue", () => {
    it("should return review content", () => {
        const reviewdata = {
            "position": {
                "start": {"line": 7, "column": 1, "offset": 27},
                "end": {"line": 8, "column": 33, "offset": 101}
            },
            "annotation": {
                "id": 8,
                "annotator_schema_version": "v1.0",
                "text": "配列とはなにか?",
                "quote": "配列",
                "ranges": [{"end": "/p[1]", "endOffset": 18, "start": "/p[1]", "startOffset": 16}],
                "uri": "http://localhost:9080/static/review/index.html",
                "filePath": path.join(__dirname, "fixtures", "README.md")
            }
        };
        const content = reviewToIssue(reviewdata, {
            fromPath: "/Users/azu/.ghq/github.com/azu/markdown-review-tool/packges/markdown-review-to-issue/test/fixtures/",
            toPath: "https://github.com/asciidwango/js-primer/blob/master/source/basic/array/"
        });
        assert.deepEqual(content, `> この章では、配列の基本的な操作と配列を扱う場合においてのパターンについて学びます。
> 配列はJavaScriptの中でもよく使われるオブジェクトです。
> -- https://github.com/asciidwango/js-primer/blob/master/source/basic/array/README.md

----

> 配列

配列とはなにか?
`);
    });
});