import "mocha";
import { expect } from "chai";
import { join } from "path";
import { press, asPipe } from "../src/api";
import { default as addMeMeta } from "../src/pipeables/md-meta/pipe";

describe("tags", () => {
  it("generates tags from page metadata", async () => {
    const initial = {};
    const reducers = {};
    const fixturePath = join(__dirname, "fixture");
    const [pages, context] = await press(fixturePath, initial, reducers);
    const piped = await asPipe(pages, context)(addMeMeta);
    const expected = [["global"], ["vessel"], ["vessel"]];
    expect(piped.map((page) => page.mdMeta.tags)).to.deep.equal(expected);
  });
});
