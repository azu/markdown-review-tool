// MIT © 2017 azu
"use strict";
const open = require("open");
const toIssue = require("./markdown-review-to-issue");
/**
 * @param markdownReviewData
 * @param options
 */
module.exports = (markdownReviewData, options = {}) => {
    const content = toIssue(markdownReviewData, options);
    const body = encodeURIComponent(content);
    const repo = options.repo;
    const url = `https://github.com/${repo}/issues/new?body=${body}`;
    open(url);
};