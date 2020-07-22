import "mocha";
import { expect } from "chai";
import { join } from "path";
import { press } from "../src/api";
import { seed as tagsSeed, reducer as tagsReducer } from "../src/reducers/tags";
import mdMeta from "../src/pipeables/md-meta";

describe("tags", () => {
  const expectedContext = {
    tags: {
      global: [
        {
          name: "",
          path: "/",
          md:
            "---\ntemplate: 'home.pug'\ntags:\n - global\n---\n\n# Beverage vessels\n\nWelcome!",
          mdMeta: { template: "home.pug", tags: ["global"] },
        },
      ],
      vessel: [
        {
          name: "french-press",
          path: "/french-press/",
          md:
            "---\nheadline: French press\ntags:\n - vessel\n---\n\n# French press\n\nThe French press is also known as a cafetière.",
          mdMeta: { headline: "French press", tags: ["vessel"] },
        },
        {
          name: "tea-pot",
          path: "/tea-pot/",
          md:
            "---\nheadline: Tea pot\ntags:\n - vessel\n---\n\n# Tea pot\n\nA teapot is a vessel used for steeping tea leaves.",
          mdMeta: { headline: "Tea pot", tags: ["vessel"] },
        },
      ],
    },
  };
  it("should find tags on each dir", async () => {
    const seed = { tags: tagsSeed };
    const reducers = { tags: tagsReducer };
    const fixturePath = join(__dirname, "fixture");
    const [_, context] = await press(fixturePath, mdMeta, seed, reducers);
    expect(context).to.deep.equal(expectedContext);
  });
});
