// MIT © 2017 azu
import {getCurrentFilePath} from "../../content-uploader/content-uploader";
const storageKey = "annotationjs-data";
const EventEmitter = require("events");
const event = new EventEmitter();
export const onChangeStorage = (handler) => {
    event.on("change", handler);
    return () => {
        event.removeAllListeners("change", handler);
    }
};

export const saveAnnotations = (annotations) => {
    const convert = function(annotation, id) {
        return {
            id,
            text: annotation.text,
            quote: annotation.quote,
            ranges: [
                {
                    end: annotation.ranges[0].end,
                    endOffset: annotation.ranges[0].endOffset,
                    start: annotation.ranges[0].start,
                    startOffset: annotation.ranges[0].startOffset,
                },
            ],
            // extra
            annotator_schema_version: "v1.0",
            uri: annotation.uri || location.href,
            filePath: annotation.filePath || getCurrentFilePath()
        };
    };
    const result = annotations.map((annotation, indexAsId) => convert(annotation, indexAsId));
    localStorage.setItem(storageKey, JSON.stringify(result));
    event.emit("change")
};
export const loadAnnotations = () => {
    return JSON.parse(localStorage.getItem(storageKey) || "[]");
};
