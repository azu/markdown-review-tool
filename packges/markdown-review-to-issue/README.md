# markdown-review-to-issue

Review data to github issue

## Install

Install with [npm](https://www.npmjs.com/):

    npm install -g markdown-review-to-issue

## Usage


    Usage
      $ pbpaste | markdown-review-to-issue --from Path --to baseURL

    Options
      --from  Want to replace path
      --to    Want to replaced URL
      --repo  user/repo
      --open  Open New issue link with --repo

    Examples
      $ pbpaste | markdown-review-to-issue --from "/path/to/fixtures/" --to baseURL "https://github.com/example/exmple/blob/master/fixtures/"
      
      $ pbpaste | markdown-review-to-issue --from "/path/to/fixtures/" --to baseURL "https://github.com/example/exmple/blob/master/fixtures/" --repo "asciidwango/js-primer" --open


## Changelog

See [Releases page](https://github.com/packges/markdown-review-to-issue/releases).

## Running tests

Install devDependencies and Run `npm test`:

    npm i -d && npm test

## Contributing

Pull requests and stars are always welcome.

For bugs and feature requests, [please create an issue](https://github.com/packges/markdown-review-to-issue/issues).

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
