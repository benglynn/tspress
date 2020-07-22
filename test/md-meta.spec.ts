import "mocha";
import { expect } from "chai";
import { join } from "path";
import { press } from "../src/api";
import { dirPipe } from "../src/pipe";
import item from "../src/pipeables/item";
import mdMeta from "../src/pipeables/md-meta";

describe("mdMeta", () => {
  const expected = [
    {
      name: "",
      path: "/",
      md:
        "---\ntemplate: 'home.pug'\ntags:\n - global\n---\n\n# Beverage vessels\n\nWelcome!",
      mdHtml: "",
      mdMeta: { template: "home.pug", tags: ["global"] },
    },
    {
      name: "french-press",
      path: "/french-press/",
      md:
        "---\nheadline: French press\ntags:\n - vessel\n---\n\n# French press\n\nThe French press is also known as a cafetière.",
      mdHtml: "",
      mdMeta: { headline: "French press", tags: ["vessel"] },
    },
    {
      name: "tea-pot",
      path: "/tea-pot/",
      md:
        "---\nheadline: Tea pot\ntags:\n - vessel\n---\n\n# Tea pot\n\nA teapot is a vessel used for steeping tea leaves.",
      mdHtml: "",
      mdMeta: { headline: "Tea pot", tags: ["vessel"] },
    },
  ];
  it("should add markdown meta to each file", async () => {
    const pipe = dirPipe(item, mdMeta);
    const [items] = await press(join(__dirname, "fixture"), pipe, {}, {});
    expect(items).to.deep.equal(expected);
  });
});
