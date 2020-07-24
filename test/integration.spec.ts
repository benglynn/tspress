import { promisify } from "util";
import { readFile } from "fs";
import "mocha";
import { expect } from "chai";
import { join } from "path";
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
    const file = promisify(readFile);
    const html = ["index", "french-press", "tea-pot"].map((name) =>
      file(join(__dirname, "expected", `${name}.html`), "utf-8")
    );
    const { pages, context } = await setup();
    const [homeHtml, frenchPressHtml, teaPotHtml] = await Promise.all(html);
    const [home, frenchPress, teaPot] = await pipe(pugRender)(pages, context);
    expect(home.html).to.equal(homeHtml);
    expect(frenchPress.html).to.equal(frenchPressHtml);
    expect(teaPot.html).to.equal(teaPotHtml);
  });
});
