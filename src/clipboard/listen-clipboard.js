// MIT © 2017 azu
"use strict";
const Clipboard = require("clipboard");
export default function listenClipboard(selector) {
    const clipboard = new Clipboard(selector);
    clipboard.on("success", function(e) {
        console.info("Copy from", e);
        e.clearSelection();
    });
    clipboard.on("error", function(e) {
        console.error("Action:", e.action);
        console.error("Trigger:", e.trigger);
    });

}