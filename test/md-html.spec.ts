import "mocha";
import { expect } from "chai";
import { join } from "path";
import { press } from "../src/api";
import { dirPipe } from "../src/pipe";
import item from "../src/pipeables/item";
import mdHtml from "../src/pipeables/md-html";

describe("meHtml", () => {
  const expected = [
    {
      name: "",
      path: "/",
      md:
        "---\ntemplate: 'home.pug'\ntags:\n - global\n---\n\n# Beverage vessels\n\nWelcome!",
      mdHtml: "<h1>Beverage vessels</h1>\n<p>Welcome!</p>",
      mdMeta: {},
    },
    {
      name: "french-press",
      path: "/french-press/",
      md:
        "---\nheadline: French press\ntags:\n - vessel\n---\n\n# French press\n\nThe French press is also known as a cafetière.",
      mdHtml:
        "<h1>French press</h1>\n<p>The French press is also known as a cafetière.</p>",
      mdMeta: {},
    },
    {
      name: "tea-pot",
      path: "/tea-pot/",
      md:
        "---\nheadline: Tea pot\ntags:\n - vessel\n---\n\n# Tea pot\n\nA teapot is a vessel used for steeping tea leaves.",
      mdHtml:
        "<h1>Tea pot</h1>\n<p>A teapot is a vessel used for steeping tea leaves.</p>",
      mdMeta: {},
    },
  ];
  it("should add markdown meta to each file", async () => {
    const pipe = dirPipe(item, mdHtml);
    const [items] = await press(join(__dirname, "fixture"), pipe, {}, {});
    expect(items).to.deep.equal(expected);
  });
});
