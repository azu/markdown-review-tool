// MIT © 2017 azu
const storageKey = "annotationjs-data";
export const saveAnnotations = (annotations) => {
    const convert = function(annotation, id) {
        return {
            id,
            annotator_schema_version: "v1.0",
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
            uri: location.href,
        };
    };
    const result = annotations.map((annotation, indexAsId) => convert(annotation, indexAsId));
    localStorage.setItem(storageKey, JSON.stringify(result));
};
export const loadAnnotations = () => {
    return JSON.parse(localStorage.getItem(storageKey) || "[]");
};
