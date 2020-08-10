import "mocha";
import { expect } from "chai";
import mdHtml from "../src/render-pipe/md-html";
import Page from "../src/types/page";
import RenderContext from "../src/types/render-context";

const delimiter = "```";
const md = `# Markdown
${delimiter}ts
type F = <T>(s: T) => T;
const fun: F = (s) => s;
const drink = (name === "Bob" && "Coffee") || "Tea";
${delimiter}
`;

const html = `<h1>Markdown</h1>
<pre><code class="ts language-ts">type F = &lt;T&gt;(s: T) =&gt; T;
const fun: F = (s) =&gt; s;
const drink = (name === "Bob" &amp;&amp; "Coffee") || "Tea";</code></pre>`;

const page: Page = {
  dependencies: [],
  html: "",
  md,
  mdHtml: "",
  mdMeta: {},
  name: "",
  path: "",
  template: "",
};

const context: RenderContext = {
  tags: {},
  tags2: {},
  pagesMap: {},
};

describe("mdHtml", () => {
  it("transforms HTML from markup", async () => {
    const htmlPage = await mdHtml(page, context);
    expect(htmlPage.mdHtml).to.equal(html);
  });
});
