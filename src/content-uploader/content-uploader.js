// MIT © 2017 azu
"use strict";
const render = require("render-markdown-with-position");
const dragDrop = require("drag-drop/buffer");
const prism = require("prismjs");
const EventEmitter = require("events");
const event = new EventEmitter();
let _currentHTML;
let _currentFilePath;
/**
 * current filePath
 * @returns {string|undefined}
 */
export const getCurrentFilePath = () => {
    return _currentFilePath;
};
export const onChangeContent = (handler) => {
    event.on("change", handler);
    return () => {
        event.removeAllListeners("change", handler);
    }
};
export function updateHTMLContent(html, filePath) {
    const isChanged = _currentHTML !== html || _currentFilePath !== filePath;
    _currentHTML = html;
    _currentFilePath = filePath;
    const article = document.getElementById("js-article");
    article.innerHTML = html;
    prism.highlightAll();
    if (isChanged) {
        event.emit("change");
    }
}
export function updateContent(content, filePath) {
    updateHTMLContent(render(content), filePath);
}
export function reloadContent() {
    if (_currentHTML) {
        updateHTMLContent(_currentHTML, _currentFilePath);
    }
}
export function setupContentDnD(selector) {
    dragDrop(selector, function(files) {
        // `files` is an Array!
        files.forEach(function(file) {
            updateContent(file.toString(), file.fullPath);
        });
    })
}