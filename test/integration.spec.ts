import "mocha";
import { expect } from "chai";
import { join } from "path";
import { press } from "../src/api";
import toPage from "../src/pipeables/to-page";
import mdHtml from "../src/pipeables/md-html";
import mdMeta from "../src/pipeables/md-meta";
import pugDeps from "../src/pipeables/pug-deps";
import { seed as tagsSeed, reducer as tagsReducer } from "../src/reducers/tags";
import { expectedPages, expectedContext } from "./expected";
import pagePipe from "../src/page-pipe";

describe("integration", () => {
  it("should use all pipeables and reducers", async () => {
    const toPage_ = pagePipe(toPage, mdHtml, mdMeta, pugDeps);
    const [pages, context] = await press(
      join(__dirname, "fixture/content"),
      join(__dirname, "fixture/templates"),
      toPage_,
      { tags: tagsSeed },
      { tags: tagsReducer }
    );
    expect(pages).to.deep.equal(expectedPages);
    expect(context).to.deep.equal(expectedContext);
  });
});
