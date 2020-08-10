import RenderPipeable from "../types/render-pipeable";
import prism from "prismjs";

const extraLangs = ["bash", "typescript", "less", "scss", "json"];
// eslint-disable-next-line @typescript-eslint/no-var-requires
require("prismjs/components/")(extraLangs);

const pattern = /<pre><code class="([-a-z]+) language-\1">([\s\S]*?)<\/code><\/pre>/g;

const highlightCode: RenderPipeable = (page) => ({
  ...page,
  mdHtml: page.mdHtml.replace(pattern, (match, langCode, code) => {
    const prismLang = prism.languages[langCode];
    if (prismLang === undefined)
      throw new Error(`prism didn't recognise language '${langCode}'`);
    const css = `class="language-${langCode}"`;
    const unescaped = code
      .replace(/&gt;/g, ">")
      .replace(/&lt;/g, "<")
      .replace(/&amp;/g, "&");
    const highlighted = prism.highlight(unescaped, prismLang, langCode);
    return `<pre ${css}"><code ${css}>${highlighted}</code></pre>`;
  }),
});

export default highlightCode;
