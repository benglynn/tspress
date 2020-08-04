import CompilePipeable from "../types/compile-pipeable";
import prism from "prismjs";

const pattern = /<pre><code class="([-a-z]+) language-\1">([\s\S]*?)<\/code><\/pre>/g;

const highlightCode: CompilePipeable = (pages) =>
  pages.map((page) => {
    return {
      ...page,
      mdHtml: page.mdHtml.replace(pattern, (match, langCode, code) => {
        const prismLang = prism.languages[langCode];
        if (prismLang === undefined)
          throw new Error(`prism didn't recognise language '${langCode}'`);
        const css = `class="language-${langCode}"`;
        const highlighted = prism.highlight(code, prismLang, langCode);
        return `<pre ${css}"><code ${css}>${highlighted}}</code></pre>`;
      }),
    };
  });

export default highlightCode;
