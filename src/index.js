// MIT © 2017 azu
import localStoragePlugin from "./annotator/plugin/localStorage-plugin";

require("../node_modules/prismjs/prism");
require("../node_modules/prismjs/themes/prism-okaidia.css");
const remark = require("remark");
const html = require("./markdown/markdown-to-html");
const annotator = require("annotator");
const content = require("./data.md");

function bootAnnotator() {
    const app = new annotator.App();
    app.include(annotator.ui.main);
    app.include(localStoragePlugin);
    return app.start().then(() => {
        return app;
    });
}

function highlighOnly(annotations) {
    console.log(annotations);
    return annotations.filter(annotation => {
        console.log(annotation);
        return annotation._local.highlights.length > 0;
    });
}
const article = document.getElementById("js-article");
const file = remark().use(html).process(content.split("\n").join("\n"));
article.innerHTML = String(file);
bootAnnotator().then((app) => {
    // all query
    console.log(app.annotations.store);
    console.log("results", app.annotations.store.query());
}).catch(error => {
    console.error(error);
});
