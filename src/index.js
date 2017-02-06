// MIT © 2017 azu
import localStoragePlugin from "./annotator/plugin/localStorage-plugin";
import {onChange} from "./annotator/plugin/annotation-storage";
import listenClipboard from "./clipboard/listen-clipboard";
import {setupContentDnD, onChangeContent} from "./content-uploader/content-uploader";
const annotator = require("annotator");
function bootAnnotator() {
    const app = new annotator.App();
    app.include(annotator.ui.main, {
        element: document.getElementById("js-article")
    });
    app.include(localStoragePlugin);
    return app.start().then(() => {
        return app;
    });
}
function xpathAll(query, context) {
    const results = document.evaluate(query, context || document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    const nodes = [];
    for (let i = 0; i < results.snapshotLength; i++) {
        nodes.push(results.snapshotItem(i));
    }
    return nodes;
}

function xpath(query, context) {
    return xpathAll(query, context)[0];
}

const updateAnnotationsList = (app) => {
    const copyButton = document.getElementById("js-copy-annotations");
    const highlightIds = Array.from(document.querySelectorAll(".annotator-hl"), (element) => {
        return parseInt(element.dataset.annotationId, 10);
    });
    const highlightAnnotations = app.annotations.store.query({
        ids: highlightIds
    }).results;
    const results = highlightAnnotations.map(annotation => {
        const element = xpath(`/${annotation.ranges[0].start}`);
        const position = JSON.parse(element.dataset.position);
        return {
            position,
            annotation
        };
    });
    copyButton.dataset.clipboardText = JSON.stringify(results);
};

let currentApp = null;
// Boot
setupContentDnD("#js-article");
setupContentDnD(".app-footer");
listenClipboard(".clipboard");
const clearButton = document.getElementById("js-clear-annotations");
clearButton.addEventListener("click", () => {
    const highlightIds = Array.from(document.querySelectorAll(".annotator-hl"), (element) => {
        return parseInt(element.dataset.annotationId, 10);
    });
    const highlightAnnotations = currentApp.annotations.store.query({
        ids: highlightIds
    }).results;
    highlightAnnotations.forEach(annotation => {
        currentApp.annotations.store.delete(annotation);
    });
    // reload
    currentApp.runHook("annotationsLoaded", []);
});

onChangeContent(() => {
    bootAnnotator().then((app) => {
        currentApp = app;
        setTimeout(() => {
            updateAnnotationsList(app);
        }, 100);
        onChange(() => {
            setTimeout(() => {
                updateAnnotationsList(app);
            }, 100);
        });
    }).catch(error => {
        console.error(error);
    });
});