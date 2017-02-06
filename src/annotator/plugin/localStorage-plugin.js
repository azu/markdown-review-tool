// MIT © 2017 azu
import {loadAnnotations, saveAnnotations} from "./annotation-storage";

export default function entryPoint() {
    return {
        start(app) {
            const annotations = loadAnnotations();
            console.log(annotations);
            // load exist annotations
            app.runHook("annotationsLoaded", [annotations]);
        },
        annotationCreated(annotation) {
            console.log("The annotation: %o has just been created!", annotation);
            const annotations = loadAnnotations();
            saveAnnotations(annotations.concat(annotation));
        },
        annotationUpdated(annotation) {
            console.log("The annotation: %o has just been updated!", annotation);
        },
        annotationDeleted(annotation) {
            console.log("The annotation: %o has just been deleted!", annotation);
        },
        query() {
            return Promise.resolve().then(() => {
                    const annotations = loadAnnotations();
                    const highlightAnnotations = annotations.filter(annotation => {
                        console.log("annotation", annotation);
                        return annotation._local.highlights.length > 0;
                    });
                    return {results: highlightAnnotations};
            });
        },

        configure: function(registry) {
            // need to register
            registry.registerUtility(this, "storage");
        }
    };
}
