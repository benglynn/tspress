import { promisify } from "util";
import { readFile } from "fs";
import "mocha";
import { expect } from "chai";
import { join } from "path";
import { press } from "../src/api";
import { expectedPages, expectedContext } from "./expected/data";
import { toPage, seed, reducers, render } from "../src/defaults";

describe("integration", () => {
  const setup = async () => {
    const [pages, context] = await press(
      join(__dirname, "fixture/content"),
      join(__dirname, "fixture/templates"),
      toPage,
      seed,
      reducers
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
    const [
      expectedHomeHtml,
      expectedFrenchPressHtml,
      expectedTeaPotHtml,
    ] = await Promise.all(html);
    const [home, frenchPress, teaPot] = await render(pages, context);
    expect(home.html).to.equal(expectedHomeHtml);
    expect(frenchPress.html).to.equal(expectedFrenchPressHtml);
    expect(teaPot.html).to.equal(expectedTeaPotHtml);
  });
});
