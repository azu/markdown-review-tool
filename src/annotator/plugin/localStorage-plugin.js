// MIT © 2017 azu
import {getCurrentFilePath} from "../../content-uploader/content-uploader";
import {loadAnnotations, saveAnnotations} from "./annotation-storage";

export default function entryPoint() {
    return {
        start(app) {
            const annotations = loadAnnotations();
            const currentAnnotations = annotations.filter(annotation => {
                const currentFilePath = getCurrentFilePath();
                return annotation.filePath === currentFilePath;
            });
            // load exist annotations
            app.runHook("annotationsLoaded", [currentAnnotations]);
        },
        create(annotation) {
            if (!annotation) {
                return;
            }
            const annotations = loadAnnotations();
            annotation.id = annotations.length; // increment
            annotations.push(annotation);
            saveAnnotations(annotations);
            return annotation;
        },
        update(updatedAnnotation) {
            if (!updatedAnnotation) {
                return;
            }
            const annotations = loadAnnotations();
            const index = annotations.findIndex(annotation => {
                return updatedAnnotation.id === annotation;
            });
            annotations[index] = updatedAnnotation;
            saveAnnotations(annotations);
            return updatedAnnotation;
        },
        delete(deletedAnnotation) {
            if (!deletedAnnotation) {
                return;
            }
            const annotations = loadAnnotations();
            const withoutAnnotations = annotations.filter(annotation => {
                return deletedAnnotation.id !== annotation.id;
            });
            saveAnnotations(withoutAnnotations);
            return deletedAnnotation;
        },
        query(queryObject) {
            if (!(queryObject && queryObject.ids)) {
                const annotations = loadAnnotations();
                return {results: annotations};
            } else {
                const idList = queryObject.ids;
                const annotations = loadAnnotations();
                const highlightAnnotations = annotations.filter(annotation => {
                    return idList.indexOf(annotation.id) !== -1;
                });
                return {results: highlightAnnotations};
            }
        },

        configure(registry) {
            // need to register
            registry.registerUtility(this, "storage");
        }
    };
}
