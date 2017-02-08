// MIT © 2017 azu
import localStoragePlugin from "./annotator/plugin/localStorage-plugin";
import {onChangeStorage} from "./annotator/plugin/annotation-storage";
import listenClipboard from "./clipboard/listen-clipboard";
import {setupContentDnD, updateHTMLContent, onChangeContent, reloadContent} from "./content-uploader/content-uploader";
const EventEmitter = require("events");
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
    const annotationCountElement = document.getElementById("js-annotation-count");
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
    annotationCountElement.textContent = results.length;
};

let unlistenStorageListner = () => {
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
        currentApp.annotations.store.delete({
            id: annotation.id
        });
    });
    // reload
    reloadContent();
});


onChangeContent(() => {
    unlistenStorageListner();
    bootAnnotator().then((app) => {
        currentApp = app;
        setTimeout(() => {
            updateAnnotationsList(app);
        }, 500);
        unlistenStorageListner = onChangeStorage(() => {
            setTimeout(() => {
                updateAnnotationsList(app);
            }, 500);
        });
    }).catch(error => {
        console.error(error);
    });
});


const appEvent = new EventEmitter();
appEvent.on("update", ({content, filePath}) => {
    updateHTMLContent(content, filePath);
});
window.appEvent = appEvent;