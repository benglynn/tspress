import "mocha";
import { expect } from "chai";
import { join } from "path";
import { press } from "../src/api";
import { dirPipe } from "../src/pipe";
import item from "../src/pipeables/item";
import mdHtml from "../src/pipeables/md-html";
import mdMeta from "../src/pipeables/md-meta";
import { seed as tagsSeed, reducer as tagsReducer } from "../src/reducers/tags";

describe("meHtml", () => {
  const expectedItems = [
    {
      name: "",
      path: "/",
      md:
        "---\ntemplate: 'home.pug'\ntags:\n - global\n---\n\n# Beverage vessels\n\nWelcome!",
      mdHtml: "<h1>Beverage vessels</h1>\n<p>Welcome!</p>",
      mdMeta: { template: "home.pug", tags: ["global"] },
    },
    {
      name: "french-press",
      path: "/french-press/",
      md:
        "---\nheadline: French press\ntags:\n - vessel\n---\n\n# French press\n\nThe French press is also known as a cafetière.",
      mdHtml:
        "<h1>French press</h1>\n<p>The French press is also known as a cafetière.</p>",
      mdMeta: { headline: "French press", tags: ["vessel"] },
    },
    {
      name: "tea-pot",
      path: "/tea-pot/",
      md:
        "---\nheadline: Tea pot\ntags:\n - vessel\n---\n\n# Tea pot\n\nA teapot is a vessel used for steeping tea leaves.",
      mdHtml:
        "<h1>Tea pot</h1>\n<p>A teapot is a vessel used for steeping tea leaves.</p>",
      mdMeta: { headline: "Tea pot", tags: ["vessel"] },
    },
  ];

  const expectedContext = {
    tags: {
      global: [
        {
          name: "",
          path: "/",
          md:
            "---\ntemplate: 'home.pug'\ntags:\n - global\n---\n\n# Beverage vessels\n\nWelcome!",
          mdHtml: "<h1>Beverage vessels</h1>\n<p>Welcome!</p>",
          mdMeta: { template: "home.pug", tags: ["global"] },
        },
      ],
      vessel: [
        {
          name: "french-press",
          path: "/french-press/",
          md:
            "---\nheadline: French press\ntags:\n - vessel\n---\n\n# French press\n\nThe French press is also known as a cafetière.",
          mdHtml:
            "<h1>French press</h1>\n<p>The French press is also known as a cafetière.</p>",
          mdMeta: { headline: "French press", tags: ["vessel"] },
        },
        {
          name: "tea-pot",
          path: "/tea-pot/",
          md:
            "---\nheadline: Tea pot\ntags:\n - vessel\n---\n\n# Tea pot\n\nA teapot is a vessel used for steeping tea leaves.",
          mdHtml:
            "<h1>Tea pot</h1>\n<p>A teapot is a vessel used for steeping tea leaves.</p>",
          mdMeta: { headline: "Tea pot", tags: ["vessel"] },
        },
      ],
    },
  };

  it("should use all pipeables and reducers", async () => {
    const toItem = dirPipe(item, mdHtml, mdMeta);
    const [items, context] = await press(
      join(__dirname, "fixture"),
      toItem,
      { tags: tagsSeed },
      { tags: tagsReducer }
    );
    expect(items).to.deep.equal(expectedItems);
    expect(context).to.deep.equal(expectedContext);
  });
});
