#!/usr/bin/env node
"use strict";
const meow = require("meow");
const reviewToIssue = require("../lib/markdown-review-to-issue");
const getStdin = require("get-stdin");
const cli = meow(`
    Usage
      $ pbpaste | markdown-review-to-issue --from Path --to baseURL

    Options
      --from  Want to replace path
      --to    Want to replaced URL

    Examples
      $ pbpaste | markdown-review-to-issue --from "/path/to/fixtures/" --to baseURL "https://github.com/example/exmple/blob/master/fixtures/"
`);

getStdin().then(string => {
    const options = {
        fromPath: cli.flags.from,
        toPath: cli.flags.to,
    };
    const json = JSON.parse(string);
    const reviews = json.map(markdownReviewData => {
        return reviewToIssue(markdownReviewData, options);
    });
    console.log(reviews.join("\n-----\n"));
}).catch(error => {
    console.log("Stdin parse error", error);
});