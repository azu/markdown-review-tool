# markdown-review-tool

Markdownをプレビューしながらコメントをアノテーションとしてつけていくツールです。

![screenshot](https://monosnap.com/file/eBG78kCoJQAcFiJRyLlndaijqM71Tj.png)

ただし、この単独のHTMLはあんまり使いやすくないので後述する[cgmd-browser](https://github.com/nakajmg/cgmd-browser "cgmd-browser")に組み込んだElectronアプリのほうが便利です。

- 文章の任意の位置にコメントを書くことができる
- 書いたコメントをJSONとしてコピーできる
    - MarkdownのSourceMapのような仕組みを持っているので、HTMLにつけたアノテーションからMarkdownの元ファイルにおける位置をとれます

```js
/* 
{
    // 元Markdownにおけるposition
    "position": {
        "start": {"line": 145, "column": 33, "offset": 225231},
        "end": {"line": 145, "column": 37, "offset": 225235}
    },
    // 変換後のHTMLに対するアノテーション
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

// JSDoc 的な定義
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
```

## Usage

### Electronアプリ

[azu/cgmd-browser](https://github.com/azu/cgmd-browser "azu/cgmd-browser")からダウンロードしてつかう。

プレビューがmarkdown-review-toolになるハックがされたforkです。

### [packges/markdown-review-to-issue](packges/markdown-review-to-issue)

コピーしたJSONデータを、Issueへコピーしやすいような形式にしたMarkdownを吐けます。

## Changelog

See [Releases page](https://github.com/azu/markdown-review-tool/releases).

## Running tests

Install devDependencies and Run `npm test`:

    npm i -d && npm test

## Contributing

Pull requests and stars are always welcome.

For bugs and feature requests, [please create an issue](https://github.com/azu/markdown-review-tool/issues).

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## Author

- [github/azu](https://github.com/azu)
- [twitter/azu_re](https://twitter.com/azu_re)

## License

MIT © azu
