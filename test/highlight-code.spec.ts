import "mocha";
import { expect } from "chai";
import highlightCode from "../src/render-pipe/highlight-code";
import Page from "../src/types/page";
import RenderContext from "../src/types/render-context";

const mdHtml = `<pre><code class="ts language-ts">type F = &lt;T&gt;(s: T) =&gt; T;
const fun: F = (s) =&gt; s;
const drink = (name === "Bob" &amp;&amp; "Coffee") || "Tea";</code></pre>`;

const page: Page = {
  dependencies: [],
  html: "",
  md: "",
  mdHtml,
  mdMeta: {},
  name: "",
  path: "",
  template: "",
};

const expected =
  "type F = &lt;T>(s: T) => T;\nconst fun: F = (s) => s;\n" +
  'const drink = (name === "Bob" &amp;&amp; "Coffee") || "Tea";';

const context: RenderContext = {
  tags: {},
};

describe("highlightCode", () => {
  it("does not double escape entities", async () => {
    const mdHtml = (await highlightCode(page, context)).mdHtml;
    const stripTags = mdHtml.replace(/\<\/?([a-z]+)[^>]*\>/g, "");
    expect(stripTags).to.equal(expected);
  });
});
