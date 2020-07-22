import "mocha";
import { expect } from "chai";
import { join } from "path";
import { press } from "../src/api";
import dirToItem from "../src/pipeables/dir-to-item";
import mdHtml from "../src/pipeables/md-html";
import mdMeta from "../src/pipeables/md-meta";
import { seed as tagsSeed, reducer as tagsReducer } from "../src/reducers/tags";
import { expectedItems, expectedContext } from "./expected";
import directoryPipe from "../src/directory-pipe";

describe("integration", () => {
  it("should use all pipeables and reducers", async () => {
    const toItem = directoryPipe(dirToItem, mdHtml, mdMeta);
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
