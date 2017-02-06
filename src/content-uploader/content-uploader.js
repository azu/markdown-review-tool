// MIT © 2017 azu
"use strict";
import html from "../markdown/markdown-to-html";
const remark = require("remark");
const dragDrop = require("drag-drop/buffer");
const prism = require("prismjs");
const EventEmitter = require("events");
const event = new EventEmitter();
export const onChangeContent = (handler) => {
    event.on("change", handler);
    return () => {
        event.removeAllListeners("change", handler);
    }
};
export function updateLocation(filePath) {
    history.pushState(filePath, "", "?" + filePath);
}
export function updateContent(content) {
    const article = document.getElementById("js-article");
    const file = remark().use(html).process(content.split("\n").join("\n"));
    article.innerHTML = String(file);
    prism.highlightAll();
    event.emit("change");
}
export function setupContentDnD(selector) {
    dragDrop(selector, function(files) {
        // `files` is an Array!
        files.forEach(function(file) {
            updateLocation(file.name);
            updateContent(file.toString());
        });
    })
}