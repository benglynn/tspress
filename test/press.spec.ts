import "mocha";
import { expect } from "chai";
import { join } from "path";
import { press } from "../src/api";
import Page from "../src/types/page";
import pressed from "./expected/pressed";

describe("press", () => {
  const setup = () => {
    const initial = { names: <string[]>[], pageCount: 0 };
    const reducers = {
      names: (page: Page, previous: string[]) => previous.concat(page.name),
      pageCount: (page: Page, previous: number) => previous + 1,
    };
    const fixturePath = join(__dirname, "fixture");
    return { initial, reducers, fixturePath };
  };

  it("should parse each directory", async () => {
    const [pages] = await press(join(__dirname, "fixture"), {}, {});
    expect(pages).to.deep.equal(pressed);
  });

  it("should fold context with reducers", async () => {
    const { initial, reducers, fixturePath } = setup();
    const [pages, context] = await press(fixturePath, initial, reducers);
    expect(pages).to.deep.equal(pressed);
    expect(context).to.deep.equal({
      names: ["", "french-press", "tea-pot"],
      pageCount: 3,
    });
  });

  it("should fold context with async reducers", async () => {
    const { initial, reducers, fixturePath } = setup();
    const asyncReducers = {
      names: (page: Page, previous: string[]) =>
        Promise.resolve(previous.concat(page.name)),
      pageCount: (page: Page, previous: number) =>
        Promise.resolve(previous + 1),
    };
    const [pages, context] = await press(fixturePath, initial, asyncReducers);
    expect(pages).to.deep.equal(pressed);
    expect(context).to.deep.equal({
      names: ["", "french-press", "tea-pot"],
      pageCount: 3,
    });
  });
});
