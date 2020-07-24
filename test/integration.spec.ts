import "mocha";
import { expect } from "chai";
import { join } from "path";
import { readFileSync } from "fs";
import { press } from "../src/api";
import toPage from "../src/pipeables/to-page";
import mdHtml from "../src/pipeables/md-html";
import mdMeta from "../src/pipeables/md-meta";
import pugDeps from "../src/pipeables/pug-deps";
import pugRender from "../src/pipeables/pug-render";
import { seed as tagsSeed, reducer as tagsReducer } from "../src/reducers/tags";
import { expectedPages, expectedContext } from "./expected/data";
import pipe from "../src/pipe";
import pagePipe from "../src/page-pipe";

describe("integration", () => {
  const setup = async () => {
    const toPage_ = pagePipe(toPage, mdHtml, mdMeta, pugDeps);
    const [pages, context] = await press(
      join(__dirname, "fixture/content"),
      join(__dirname, "fixture/templates"),
      toPage_,
      { tags: tagsSeed },
      { tags: tagsReducer }
    );
    return { pages, context };
  };

  it("uses pipeables and reducers as expected", async () => {
    const { pages, context } = await setup();
    expect(pages).to.deep.equal(expectedPages);
    expect(context).to.deep.equal(expectedContext);
  });

  it("compiles expected html", async () => {
    const expected = (name: string) =>
      readFileSync(join(__dirname, "expected", name), "utf-8");
    const { pages, context } = await setup();
    const [home, frenchPress, teaPot] = await pipe(pugRender)(pages, context);
    expect(home.html).to.equal(expected("index.html"));
    expect(frenchPress.html).to.equal(expected("french-press.html"));
    expect(teaPot.html).to.equal(expected("tea-pot.html"));
  });
});
