#!/usr/bin/env node
"use strict";
const meow = require("meow");
const reviewToIssue = require("../lib/markdown-review-to-issue");
const openLink = require("../lib/open-link");
const getStdin = require("get-stdin");
const cli = meow(`
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
`);

getStdin().then(string => {
    const options = {
        fromPath: cli.flags.from,
        toPath: cli.flags.to,
        repo: cli.flags.repo,
        open: cli.flags.open !== undefined ? cli.flags.open : false
    };
    const json = JSON.parse(string);
    if (options.open) {
        json.forEach(markdownReviewData => {
            openLink(markdownReviewData, options);
        })
    } else {
        const reviews = json.map(markdownReviewData => {
            return reviewToIssue(markdownReviewData, options);
        });
        console.log(reviews.join("\n-----\n"));
    }
}).catch(error => {
    console.log("Stdin parse error", error);
});