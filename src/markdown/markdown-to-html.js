const xtend = require("xtend");
const toHAST = require("mdast-util-to-hast");
const toHTML = require("@azu/hast-util-to-html");
const sanitize = require("hast-util-sanitize");

module.exports = function plugin(processor, options) {
  const settings = options || {};
  const clean = settings.sanitize;
  const schema = clean && typeof clean === "object" ? clean : null;

  function Compiler(file) {
        /* istanbul ignore if - vfile@1.0.0 */
    if (file.extension) {
      file.move({ extension: "html" });
    }

    if (file.extname) {
      file.extname = ".html";
    }
  }

  function compile(node) {
    const root = node && node.type && node.type === "root";
    let hast = toHAST(node, { allowDangerousHTML: !clean });
    let result;

    if (clean) {
      hast = sanitize(hast, schema);
    }

    result = toHTML(hast, xtend(settings, {
      allowDangerousHTML: !clean,
    }));

        /* Add a final newline. */
    if (root && result.charAt(result.length - 1) !== "\n") {
      result += "\n";
    }

    return result;
  }
  Compiler.prototype.compile = compile;
  processor.Compiler = Compiler;
};
